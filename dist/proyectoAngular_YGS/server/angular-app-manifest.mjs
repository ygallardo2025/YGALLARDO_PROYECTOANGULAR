
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
      "chunk-LTPY3PVS.js",
      "chunk-F6YX5B72.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2GMSCEHN.js"
    ],
    "route": "/dashboard"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-L6F76ND2.js",
      "chunk-Z2VTDOTZ.js",
      "chunk-HYBGBYM6.js",
      "chunk-F6YX5B72.js"
    ],
    "route": "/students"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-JZ6WBDA3.js",
      "chunk-5IFMELBI.js",
      "chunk-HYBGBYM6.js",
      "chunk-F6YX5B72.js"
    ],
    "route": "/cursos"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-Z4HYK4FW.js",
      "chunk-Z2VTDOTZ.js",
      "chunk-5IFMELBI.js",
      "chunk-HYBGBYM6.js",
      "chunk-F6YX5B72.js"
    ],
    "route": "/inscripciones"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-3Q2UMSYH.js",
      "chunk-F6YX5B72.js"
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
    'index.csr.html': {size: 34214, hash: '30bf8b759b72af3a3a00150227add973190eb0ceabe1f3bde152ea5c4387ca9d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17532, hash: 'f038a6c006d03ccd959a4d41d03bbe6e8d4a8b772d85a8ba369f856eb9b60105', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'students/index.html': {size: 56884, hash: '5f9c56f736a3e5f1a764554713517f752621e2c7f03b88cbad974db35f45a016', text: () => import('./assets-chunks/students_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 56780, hash: '70ded0695e2b2cb4ae00398684683bc3374174d5bf623660c06c9adbe46233f9', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 56728, hash: '3a2fd6e3e106b0ac6ebf120d7f55edba3cc2a73c45d1a4b844cc513d7d13461e', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'cursos/index.html': {size: 56884, hash: '77f406ea8eb78f0cc76d49daf3e90577b135f2cbee11420a6ef361a4329209aa', text: () => import('./assets-chunks/cursos_index_html.mjs').then(m => m.default)},
    'inscripciones/index.html': {size: 56936, hash: '87774a353f17342e0d5a3d9b38359ccfcec8eb7680d15055a7b419f561580ab5', text: () => import('./assets-chunks/inscripciones_index_html.mjs').then(m => m.default)},
    'usuarios/index.html': {size: 56780, hash: '53e112512f4aef5c35e4e23b71a7d900bce8de0eb5fb60ac7197e2a50bda9abb', text: () => import('./assets-chunks/usuarios_index_html.mjs').then(m => m.default)},
    'styles-4GZ464VC.css': {size: 405393, hash: 't4iF+L6ir+s', text: () => import('./assets-chunks/styles-4GZ464VC_css.mjs').then(m => m.default)}
  },
};
