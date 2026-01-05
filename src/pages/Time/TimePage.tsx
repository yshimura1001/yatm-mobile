import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonProgressBar, IonFooter, IonLabel, IonFab, IonFabButton, IonIcon, IonTabBar, IonTabButton, IonButton, IonItem } from '@ionic/react';
import { list, apps } from 'ionicons/icons';
import TimeTaskItem from '../../components/Time/TimeTaskItem';
import { useApp } from '../../context/AppContext';
import { Section } from '../../models/Section';
import { SectionGroup } from '../../models/SectionGroup';
import { Holiday } from '../../models/Holiday';
import { chevronBack, settings, arrowForward, calendar, add, trash } from 'ionicons/icons';
import RoutineView from '../../components/Routine/RoutineView';
import HolidayEditModal from '../../components/Holiday/HolidayEditModal';
import SectionGroupEditModal from '../../components/Section/SectionGroupEditModal';
import { repeat } from 'ionicons/icons';

const TimePage: React.FC = () => {
  const { timeTasks, setTimeTasks, activePerspectiveId, perspectives } = useApp();
  // currentTime is local UI state
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [selectedTab, setSelectedTab] = React.useState<'taskchute' | 'routine' | 'section' | 'holiday'>('taskchute');
  const [selectedGroupId, setSelectedGroupId] = React.useState<string | null>(null);

  // Holidays state
  const [holidays, setHolidays] = React.useState<Holiday[]>(() => {
    const saved = localStorage.getItem('yatm_holidays');
    return saved ? JSON.parse(saved) : [
      { id: '1', month: 1, day: 1, note: '元日' },
      { id: '2', month: 1, day: 13, note: '成人の日' },
      { id: '3', month: 2, day: 11, note: '建国記念の日' },
    ];
  });

  const [sectionGroups, setSectionGroups] = React.useState<SectionGroup[]>(() => {
    const saved = localStorage.getItem('yatm_section_groups');
    return saved ? JSON.parse(saved) : [
      { id: 'group-weekday', title: '平日' },
      { id: 'group-holiday', title: '休日' },
      { id: 'group-special', title: '特別' },
    ];
  });

  const [isHolidayModalOpen, setIsHolidayModalOpen] = React.useState(false);
  const [editingHoliday, setEditingHoliday] = React.useState<Holiday | undefined>(undefined);

  const [isSectionGroupModalOpen, setIsSectionGroupModalOpen] = React.useState(false);
  const [editingSectionGroup, setEditingSectionGroup] = React.useState<SectionGroup | undefined>(undefined);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('yatm_holidays', JSON.stringify(holidays));
  }, [holidays]);

  useEffect(() => {
    localStorage.setItem('yatm_section_groups', JSON.stringify(sectionGroups));
  }, [sectionGroups]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStart = (id: string) => {
    setTimeTasks(prev => prev.map(task =>
      task.id === id
        ? { ...task, isRunning: true, startTime: task.startTime || new Date() }
        : { ...task, isRunning: false }
    ));
  };

  const handleStop = (id: string) => {
    setTimeTasks(prev => prev.map(task =>
      task.id === id ? { ...task, isRunning: false, endTime: new Date() } : task
    ));
  };

  const handleComplete = (id: string) => {
    setTimeTasks(prev => prev.map(task => {
      if (task.id === id) {
        const isNowCompleted = !task.isCompleted;
        return {
          ...task,
          isCompleted: isNowCompleted,
          isRunning: false,
          endTime: isNowCompleted ? new Date() : task.endTime
        };
      }
      return task;
    }));
  };

  const currentPerspectiveName = activePerspectiveId
    ? perspectives.find(p => p.id === activePerspectiveId)?.name
    : 'すべて';

  const filteredTasks = activePerspectiveId
    ? timeTasks.filter(t => t.perspectiveId === activePerspectiveId)
    : timeTasks;

  const totalEst = filteredTasks.reduce((acc, t) => acc + t.estimatedMinutes, 0);
  const completedEst = filteredTasks.filter(t => t.isCompleted).reduce((acc, t) => acc + t.estimatedMinutes, 0);
  const progress = totalEst > 0 ? completedEst / totalEst : 0;

  // Sample sections generator function
  const getSectionsForGroup = (groupId: string): Section[] => {
    // Just return the same simple sections for now
    return Array.from({ length: 18 }, (_, i) => {
      const start = 6 + i;
      const startMinute = 0;
      const endMinute = 0;
      return {
        id: `section-${groupId}-${start}`,
        title: `${start.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')} - ${(start + 1).toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`,
        startHour: start,
        startMinute,
        endHour: start + 1,
        endMinute,
      };
    });
  };

  const currentSections = selectedGroupId ? getSectionsForGroup(selectedGroupId) : [];
  const currentGroupTitle = sectionGroups.find(g => g.id === selectedGroupId)?.title;


  const handleSaveHoliday = (holidayData: Omit<Holiday, 'id'> & { id?: string }) => {
    // Check for duplicates
    const isDuplicate = holidays.some(h =>
      h.month === holidayData.month &&
      h.day === holidayData.day &&
      h.id !== holidayData.id
    );

    if (isDuplicate) {
      alert('重複しているので登録できません。');
      return;
    }

    if (holidayData.id) {
      // Edit
      setHolidays(prev => prev.map(h => h.id === holidayData.id ? { ...holidayData, id: holidayData.id! } : h));
    } else {
      // Add
      const newHoliday: Holiday = {
        ...holidayData,
        id: Math.random().toString(36).substr(2, 9),
      };
      setHolidays(prev => [...prev, newHoliday]);
    }
    setIsHolidayModalOpen(false);
  };

  const handleDeleteHoliday = (id: string) => {
    if (window.confirm('この休日を削除しますか？')) {
      setHolidays(prev => prev.filter(h => h.id !== id));
    }
  };

  const openAddHolidayModal = () => {
    setEditingHoliday(undefined);
    setIsHolidayModalOpen(true);
  };

  const openEditHolidayModal = (holiday: Holiday) => {
    setEditingHoliday(holiday);
    setIsHolidayModalOpen(true);
  };

  const handleSaveSectionGroup = (groupData: SectionGroup) => {
    if (groupData.id) {
      // Edit
      setSectionGroups(prev => prev.map(g => g.id === groupData.id ? { ...groupData } : g));
    } else {
      // Add
      const newGroup: SectionGroup = {
        ...groupData,
        id: `group-${Date.now()}`,
      };
      setSectionGroups(prev => [...prev, newGroup]);
    }
    setIsSectionGroupModalOpen(false);
  };

  const openAddSectionGroupModal = () => {
    setEditingSectionGroup(undefined);
    setIsSectionGroupModalOpen(true);
  };

  const openEditSectionGroupModal = (group: SectionGroup) => {
    setEditingSectionGroup(group);
    setIsSectionGroupModalOpen(true);
  };

  const getPageTitle = () => {
    switch (selectedTab) {
      case 'taskchute':
        return `タスクシュート (${currentPerspectiveName})`;
      case 'routine':
        return `ルーチン (${currentPerspectiveName})`;
      case 'section':
        return selectedGroupId ? currentGroupTitle : 'セクショングループ';
      case 'holiday':
        return '休日設定';
      default:
        return '時間';
    }
  };

  const getDayOfWeek = (month: number, day: number) => {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    const currentYear = new Date().getFullYear();
    const date = new Date(currentYear, month - 1, day);
    return days[date.getDay()];
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {selectedTab === 'section' && selectedGroupId ? (
              <IonButton onClick={() => setSelectedGroupId(null)}>
                <IonIcon slot="icon-only" icon={chevronBack} />
              </IonButton>
            ) : (
              <IonMenuButton />
            )}
          </IonButtons>
          <IonTitle>{getPageTitle()}</IonTitle>
        </IonToolbar>
        <IonProgressBar value={progress} color="success"></IonProgressBar>
      </IonHeader>
      <IonContent fullscreen>
        {selectedTab === 'taskchute' && (
          <>
            <IonList>
              {filteredTasks.map(task => (
                <TimeTaskItem
                  key={task.id}
                  task={task}
                  onStart={handleStart}
                  onStop={handleStop}
                  onComplete={handleComplete}
                />
              ))}
            </IonList>
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
              <IonFabButton>
                <IonIcon icon={add} />
              </IonFabButton>
            </IonFab>
          </>
        )}
        {selectedTab === 'section' && (
          <>
            <IonList>
              {!selectedGroupId ? (
                // Group List
                sectionGroups.map(group => (
                  <IonItem key={group.id}>
                    <IonLabel>
                      <h2>{group.title}</h2>
                    </IonLabel>
                    <IonButtons slot="end">
                      <IonButton onClick={(e) => {
                        e.stopPropagation();
                        openEditSectionGroupModal(group);
                      }}>
                        <IonIcon slot="icon-only" icon={settings} />
                      </IonButton>
                      <IonButton onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGroupId(group.id);
                      }}>
                        <IonIcon slot="icon-only" icon={arrowForward} />
                      </IonButton>
                    </IonButtons>
                  </IonItem>
                ))
              ) : (
                // Section List for selected group
                currentSections.map(section => (
                  <div key={section.id} className="ion-padding-horizontal ion-padding-vertical border-bottom" style={{ borderBottom: '1px solid var(--ion-color-medium-shade)' }}>
                    <IonLabel>
                      <h2>{section.title}</h2>
                    </IonLabel>
                  </div>
                ))
              )}
            </IonList>
            {!selectedGroupId && (
              <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton onClick={openAddSectionGroupModal}>
                  <IonIcon icon={add} />
                </IonFabButton>
              </IonFab>
            )}
            <SectionGroupEditModal
              isOpen={isSectionGroupModalOpen}
              onDismiss={() => setIsSectionGroupModalOpen(false)}
              onSave={handleSaveSectionGroup}
              initialGroup={editingSectionGroup}
            />
          </>
        )}
        {selectedTab === 'routine' && (
          <RoutineView />
        )}
        {selectedTab === 'holiday' && (
          <>
            <IonList>
              {holidays.map(holiday => (
                <IonItem key={holiday.id} onClick={() => openEditHolidayModal(holiday)}>
                  <IonLabel>
                    <h2>{holiday.month.toString().padStart(2, '0')}/{holiday.day.toString().padStart(2, '0')} ({getDayOfWeek(holiday.month, holiday.day)}) {holiday.note}</h2>
                  </IonLabel>
                  <IonButtons slot="end">
                    <IonButton onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteHoliday(holiday.id);
                    }}>
                      <IonIcon slot="icon-only" icon={trash} color="danger" />
                    </IonButton>
                  </IonButtons>
                </IonItem>
              ))}
            </IonList>
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
              <IonFabButton onClick={openAddHolidayModal}>
                <IonIcon icon={add} />
              </IonFabButton>
            </IonFab>
            <HolidayEditModal
              isOpen={isHolidayModalOpen}
              onDismiss={() => setIsHolidayModalOpen(false)}
              onSave={handleSaveHoliday}
              initialHoliday={editingHoliday}
            />
          </>
        )}
      </IonContent>
      {selectedTab === 'taskchute' && (
        <IonToolbar>
          <IonLabel className="ion-text-center ion-padding">
            見積もり合計: {totalEst} 分
          </IonLabel>
        </IonToolbar>
      )}
      <IonTabBar slot="bottom">
        <IonTabButton tab="taskchute" selected={selectedTab === 'taskchute'} onClick={() => setSelectedTab('taskchute')}>
          <IonIcon icon={list} />
          <IonLabel>タスクシュート</IonLabel>
        </IonTabButton>
        <IonTabButton tab="routine" selected={selectedTab === 'routine'} onClick={() => setSelectedTab('routine')}>
          <IonIcon icon={repeat} />
          <IonLabel>ルーチン</IonLabel>
        </IonTabButton>
        <IonTabButton tab="section" selected={selectedTab === 'section'} onClick={() => setSelectedTab('section')}>
          <IonIcon icon={apps} />
          <IonLabel>セクション</IonLabel>
        </IonTabButton>
        <IonTabButton tab="holiday" selected={selectedTab === 'holiday'} onClick={() => setSelectedTab('holiday')}>
          <IonIcon icon={calendar} />
          <IonLabel>休日設定</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonPage>
  );
};

export default TimePage;
