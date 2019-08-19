export default ({ app, store }) => {
  (function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    (i[r] =
      i[r] ||
      function() {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(
    window,
    document,
    'script',
    'https://www.google-analytics.com/analytics.js',
    'ga'
  );

  ga('create', '<-----ID----->', 'auto');

  app.router.afterEach((to, from) => {
    ga('set', 'page', to.path);

    // Evitar enviar datos a GA al estar en etapa de desarrollo
    if (
      location.hostname === 'localhost' ||
      location.hostname === '127.0.0.1'
    ) {
      ga('set', 'sendHitTask', null);
    } else {
      ga('send', 'pageview');
    }
  });
};