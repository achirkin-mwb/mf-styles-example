async function fetchImport() {
  return new Promise(async (resolve, reject) => {
    try {
      const res = (await import("home/Button")).default;
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}

const css = require('./style.css').toString();

export default {
  name: "Layout",
  async setup() {
    const initComponent = await fetchImport();
    initComponent();
    return;
  },
  data: function() {
    return {
      styles: css
    }
  },
  template: `
    <div class="layout-app">
        <div class="app-label">
          <h1>home App vue based</h1>
            # Hosting App [vue based]
          </div>
          <h1>Layout App react based</h1>
          <div class="remote-component">
          <div class="app-label">
            <custom-button :styles="styles" />
          </div>
        </div>  
  </div>
  `,
};
