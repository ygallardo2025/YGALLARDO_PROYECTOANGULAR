
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/login",
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-4CHQAMRJ.js",
      "chunk-CF6JDDZ2.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-4JEID35C.js"
    ],
    "route": "/dashboard"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-XJGKIM3J.js",
      "chunk-ZQGHR2R6.js",
      "chunk-V6KXUH27.js",
      "chunk-CF6JDDZ2.js"
    ],
    "route": "/students"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-XL6HBKNT.js",
      "chunk-J7TO2JFV.js",
      "chunk-V6KXUH27.js",
      "chunk-CF6JDDZ2.js"
    ],
    "route": "/cursos"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-7EB5LE5N.js",
      "chunk-ZQGHR2R6.js",
      "chunk-J7TO2JFV.js",
      "chunk-V6KXUH27.js",
      "chunk-CF6JDDZ2.js"
    ],
    "route": "/inscripciones"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-6RNT7WMS.js",
      "chunk-CF6JDDZ2.js"
    ],
    "route": "/usuarios"
  },
  {
    "renderMode": 2,
    "redirectTo": "/login",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 34255, hash: '65def0ba68449473105359e71785a1593b91e4836ab01b2c61463da118e70125', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17532, hash: '8b64868abb7325b7299f46d39a038ec537922b0f2b4ddaf70fcc6775b2d5b746', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 53934, hash: '510dcc1c12ed446919e509669b1d803a2c72b694ac9ac0d578d712c96fbd9e09', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'usuarios/index.html': {size: 53986, hash: '263255d622109107cd159566196ec5dd1bbaa204e019405f0a5ea9bb70c29ac7', text: () => import('./assets-chunks/usuarios_index_html.mjs').then(m => m.default)},
    'students/index.html': {size: 54090, hash: '8ca5c4bf1f8d7d1fad2c5b15fe5c16e20ba491b719f44a84ca2995f0c4b9526d', text: () => import('./assets-chunks/students_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 53986, hash: '95a09032ac6ff3e7bbc0e99681c73d0b9e47434dcba17fef6e849472bf356006', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'cursos/index.html': {size: 54090, hash: 'cfe827181c14ec2abbadf07c7aea0c6e361102c1d4f8be373c7e35a746b942c0', text: () => import('./assets-chunks/cursos_index_html.mjs').then(m => m.default)},
    'inscripciones/index.html': {size: 54142, hash: 'f973dcc9e6bb2b7cc2e5de5b90b749a3bcbda9f7abc7a37d738afbbf469c2c46', text: () => import('./assets-chunks/inscripciones_index_html.mjs').then(m => m.default)},
    'styles-2LIKKSNB.css': {size: 405436, hash: 'bVlBXIWPlHg', text: () => import('./assets-chunks/styles-2LIKKSNB_css.mjs').then(m => m.default)}
  },
};
