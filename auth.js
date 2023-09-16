(function () {
  window.TrustPortAuth = {
    clientId: null,
    domainId: null,

    loadClient: function (id) {
      this.clientId = id;
    },

    loadDomain: function (id) {
      this.domainId = id;
    },

    init: function () {
      function redirectToSite() {
        const encodedClientId = encodeURIComponent(TrustPortAuth.clientId);
        const encodedDomainId = encodeURIComponent(TrustPortAuth.domainId);
        window.location.href = `http://localhost:4200/authenticate?clientId=${encodedClientId}&domainId=${encodedDomainId}`;
      }

      function isValidIdFormat(id, isDomainId = false) {
        const baseRegex = /^[a-zA-Z0-9+/]{12}$/;

        const escapedClientId = TrustPortAuth.clientId.replace(/\+/g, '\\+');

        const domainIdRegex = new RegExp(`^${escapedClientId}-\\d{3}$`);


        if (isDomainId) {
          const valid = domainIdRegex.test(id);
          return valid;
        }

        return baseRegex.test(id);
      }

      const validElements = ['DIV', 'BUTTON', 'INPUT'];

      const element = document.getElementById('tp-auth');
      if (!element) {
        console.error('Falta agregar el ID del elemento.');
        return;
      }

      if (!validElements.includes(element.tagName)) {
        console.error('No se encuentra el elemento HTML.');
        return;
      }

      if (element.tagName === 'INPUT' && element.type !== 'button') {
        console.error('El elemento INPUT debe ser de tipo button.');
        return;
      }

      if (!isValidIdFormat(TrustPortAuth.clientId)) {
        console.error('Formato de clientId inválido.');
        return;
      }

      if (!isValidIdFormat(TrustPortAuth.domainId, true)) {
        console.error('Formato de domainId inválido o no coincide con clientId.');
        return;
      }

      element.addEventListener('click', redirectToSite);

      console.log('Servicio de autenticación configurado correctamente.');
    },
  };
})();

document.addEventListener('DOMContentLoaded', function () {
  if (window.TrustPortAuth) {
    TrustPortAuth.init();
  }
});
