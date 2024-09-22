import { configureStore } from '@reduxjs/toolkit';
import userSlicer from '../features/userSlicer';
import bookingSlicer from '../features/bookingSlicer';
import customerSlicer from '../features/customerSlicer';
import providerSlicer from '../features/providerSlicer';
import SiteLoaderPage from '../features/SiteLoaderPage';
import franchiseSlicer from '../features/franchiseSlicer';
import siteSettingsSlicer from '../features/siteSettingsSlicer';
import employeeSlicer from '../features/employeeSlicer';
import sosSlicer from '../features/sosSlicer';
import adminSlicer from '../features/adminSlicer';
import referralSlicer from '../features/referralSlicer';

const store = configureStore({
  reducer: {
    user: userSlicer,
    booking: bookingSlicer,
    customer: customerSlicer,
    provider: providerSlicer,
    franchise: franchiseSlicer,
    siteLoaderPage: SiteLoaderPage,
    siteSettings: siteSettingsSlicer,
    employee: employeeSlicer,
    sos: sosSlicer,
    admin: adminSlicer,
    referral: referralSlicer
  },
});

export default store;
