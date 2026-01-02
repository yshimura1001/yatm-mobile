// jest-domはDOMノードのアサーション用カスタムjestマッチャーを追加します。
// 次のようなことができます:
// expect(element).toHaveTextContent(/react/i)
// 詳細は: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// matchmediaのモック
window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () { },
    removeListener: function () { }
  };
};
