const advanceStorage = {
  /**
   * 设置
   * @param {string} key
   * @param {string} val
   * @param {number} timestamp 过期时间戳
   */
  setItem(key, val, timestamp) {
    localStorage.setItem(key, JSON.stringify({
      v: val,
      t: timestamp || -1,
    }));
  },
  /**
   * 获取
   * @param {string} key
   */
  getItem(key) {
      let { v, t } = JSON.parse(localStorage.getItem(key) || '{}');
      t = +t;
      // 永久保存
      if (t === -1) {
        // 如果是字符串的话，就直接返回
        if (typeof v === "string") {
          return v;
        }
        // 否则，用  JSON.stringify 保持原样
        return JSON.stringify(v);
      }
      // 已过期
      if (t < Date.now()) {
        localStorage.removeItem(key);
        // eslint-disable-next-line
        console.warn(`"${key}" 已过期`);
        return null;
      }
      // 普通的存储
      return localStorage.getItem(key);
  },
  /**
   * 移除
   * @param {string} key
   */
  removeItem(key) {
    localStorage.removeItem(key);
  },
  /**
   * 清空
   */
  clear() {
    localStorage.clear();
  }
};

export default advanceStorage;
