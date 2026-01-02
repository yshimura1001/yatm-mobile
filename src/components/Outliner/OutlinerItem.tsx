import React from 'react';
import { IonItem, IonLabel, IonIcon, IonCheckbox, IonButton } from '@ionic/react';
import { chevronForward, chevronDown, ellipseOutline } from 'ionicons/icons';
import { Task } from '../../models/Task';
import './OutlinerItem.css';

interface OutlinerItemProps {
  task: Task;
  level: number;
  onToggleExpand: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

const OutlinerItem: React.FC<OutlinerItemProps> = ({ task, level, onToggleExpand, onToggleComplete }) => {
  const hasChildren = task.children && task.children.length > 0;
  const paddingLeft = `${level * 20}px`;

  return (
    <>
      <IonItem
        lines="none"
        className={`outliner-item ${task.isCompleted ? 'completed' : ''}`}
        style={{ '--padding-start': '0' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', paddingLeft: paddingLeft }}>
          {/* インデント / 展開トグル */}
          <div
            className="expand-icon-container"
            onClick={(e) => {
              e.stopPropagation();
              if (hasChildren) onToggleExpand(task.id);
            }}
          >
            {hasChildren ? (
              <IonIcon icon={task.isExpanded ? chevronDown : chevronForward} size="small" />
            ) : (
              <div className="spacer" />
            )}
          </div>

          {/* チェックボックス (カスタムまたはIonic) */}
          <IonCheckbox
            checked={task.isCompleted}
            onIonChange={() => onToggleComplete(task.id)}
            aria-label="Toggle Completion"
            slot="start"
            style={{ marginInlineEnd: '10px' }}
          />

          {/* タスクタイトル */}
          <IonLabel className="ion-text-wrap">{task.title}</IonLabel>
        </div>
      </IonItem>

      {/* 再帰的な子要素 */}
      {task.isExpanded && hasChildren && (
        <div className="children-container">
          {task.children.map(child => (
            <OutlinerItem
              key={child.id}
              task={child}
              level={level + 1}
              onToggleExpand={onToggleExpand}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default OutlinerItem;
