export default {
  services: {
    ccdDataApi: 'https://ccd-data-store-api-demo.service.core-compute-demo.internal',
    ccdDefApi: 'https://ccd-definition-store-api-demo.service.core-compute-demo.internal',
    idamWeb: 'https://idam-web-public.demo.platform.hmcts.net',
    idamApi: 'https://idam-api.demo.platform.hmcts.net',
    s2s: 'https://rpe-service-auth-provider-demo.service.core-compute-demo.internal',
    draftStoreApi: 'https://draft-store-service-aat.service.core-compute-aat.internal',
    dmStoreApi: 'https://dm-store-aat.service.core-compute-aat.internal',
    emAnnoApi: 'https://em-anno-aat.service.core-compute-aat.internal',
    emNpaApi: 'https://em-npa-aat.service.core-compute-aat.internal',
    cohCorApi: 'https://coh-cor-aat.service.core-compute-aat.internal',
    rdProfessionalApi: 'https://rd-professional-api-demo.service.core-compute-demo.internal',
  },
  health: {
    ccdDataApi: 'https://ccd-data-store-api-demo.service.core-compute-demo.internal/health',
    ccdDefApi: 'https://ccd-definition-store-api-demo.service.core-compute-demo.internal/health',
    idamWeb: 'https://idam-web-public.demo.platform.hmcts.net/health',
    idamApi: 'https://idam-api.demo.platform.hmcts.net/health',
    s2s: 'https://rpe-service-auth-provider-aat.service.core-compute-aat.internal/health',
    draftStoreApi: 'https://draft-store-service-aat.service.core-compute-aat.internal/health',
    dmStoreApi: 'https://dm-store-aat.service.core-compute-aat.internal/health',
    emAnnoApi: 'https://em-anno-aat.service.core-compute-aat.internal/health',
    emNpaApi: 'https://em-npa-aat.service.core-compute-aat.internal/health',
    cohCorApi: 'https://coh-cor-aat.service.core-compute-aat.internal/health',
    rdProfessionalApi: 'https://rd-professional-api-demo.service.core-compute-demo.internal/health',
  },
    proxy: {
        host: '172.16.0.7',
        port: 8080,
    },
    protocol: 'http',
    secureCookie: false,
    sessionSecret: 'secretSauce',
    logging: 'debug',
    jurisdictions: [
      {id: 'SSCS'},
      {id: 'SSCS'},
      {id: 'AUTOTEST1'},
      {id: 'DIVORCE'},
      {id: 'PROBATE'},
      {id: 'PUBLICLAW'},
      {id: 'bulkscan'},
      {id: 'BULKSCAN'},
      {id: 'IA'},
      {id: 'EMPLOYMENT'},
      {id: 'CMC'},
    ],
}
