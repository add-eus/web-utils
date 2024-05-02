// Import the functions you need from the SDKs you need
import { getAnalytics, initializeAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { ReCaptchaEnterpriseProvider, initializeAppCheck } from "firebase/app-check";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectDatabaseEmulator, getDatabase } from "firebase/database";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { getPerformance, initializePerformance } from "firebase/performance";
import { fetchAndActivate, getRemoteConfig } from "firebase/remote-config";
import { connectStorageEmulator, getStorage } from "firebase/storage";

const global = window as any;
export function useFirebase() {
    if (global.providers === undefined) {
        global.providers = {};

        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
            authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
            databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
            projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
            storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
            appId: import.meta.env.VITE_FIREBASE_APP_ID,
            measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
        };

        // Initialize Firebase
        global.providers.app = initializeApp(firebaseConfig);

        global.providers.auth = getAuth(global.providers.app);
        global.providers.firestore = getFirestore(global.providers.app);
        global.providers.database = getDatabase(global.providers.app);
        global.providers.storage = getStorage(global.providers.app);
        global.providers.functions = getFunctions(global.providers.app, "europe-west1");

        global.providers.remoteConfig = getRemoteConfig(global.providers.app);

        void fetchAndActivate(global.providers.remoteConfig);

        if (import.meta.env.DEV && global.emulatorLoaded !== true) {
            // eslint-disable-next-line no-console
            console.log("Development mode");

            const host =
                import.meta.env.VITE_HOST !== undefined
                    ? import.meta.env.VITE_HOST
                    : "localhost";

            connectAuthEmulator(
                global.providers.auth,
                import.meta.env.VITE_FIRESTORE_AUTH_HOST !== undefined
                    ? import.meta.env.VITE_FIRESTORE_AUTH_HOST
                    : `http://${host}:${
                          import.meta.env.VITE_AUTH_PORT !== undefined
                              ? import.meta.env.VITE_AUTH_PORT
                              : 8012
                      }`,
            );

            connectFirestoreEmulator(
                global.providers.firestore,
                host,
                import.meta.env.VITE_FIRESTORE_PORT !== undefined
                    ? parseInt(import.meta.env.VITE_FIRESTORE_PORT)
                    : 8014,
            );

            connectFunctionsEmulator(
                global.providers.functions,
                host,
                import.meta.env.VITE_FUNCTION_PORT !== undefined
                    ? parseInt(import.meta.env.VITE_FUNCTION_PORT)
                    : 8013,
            );

            connectDatabaseEmulator(
                global.providers.database,
                host,
                import.meta.env.VITE_DATABASE_PORT !== undefined
                    ? parseInt(import.meta.env.VITE_DATABASE_PORT)
                    : 8015,
            );

            connectStorageEmulator(
                global.providers.storage,
                host,
                import.meta.env.VITE_STORAGE_PORT !== undefined
                    ? parseInt(import.meta.env.VITE_STORAGE_PORT)
                    : 8016,
            );

            global.FIREBASE_APPCHECK_DEBUG_TOKEN =
                import.meta.env.VITE_APP_CHECK_DEBUG_TOKEN;

            global.emulatorLoaded = true;

            global.providers.analytics = initializeAnalytics(global.providers.app, {
                config: {
                    allow_google_signals: false,
                    allow_ad_perzonalization_signals: false,
                    event_category: "dev",
                }
            });
            global.providers.performance = initializePerformance(global.providers.app, {
                dataCollectionEnabled: false,
                instrumentationEnabled: false,
            });
        } else {
            global.providers.analytics = getAnalytics(global.providers.app);
            global.providers.performance = getPerformance(global.providers.app);
        }

        global.providers.check = initializeAppCheck(global.providers.app, {
            provider: new ReCaptchaEnterpriseProvider(import.meta.env.VITE_RECAPTCHA_KEY),

            // Optional argument. If true, the SDK automatically refreshes App Check
            // tokens as needed.
            // isTokenAutoRefreshEnabled: true,
        });
    }
    return global.providers;
}
