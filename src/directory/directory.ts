const directory = {
  lib: {
    productRoot: {
      title: "Amplify Libraries",
      route: "/lib",
    },
    items: {
      "project-setup": {
        title: "Project Setup",
        items: [
          {
            title: "Prerequisites",
            route: "lib/project-setup/prereq",
            filters: ["android", "ios", "flutter"],
          },
          {
            title: "Create your application",
            route: "lib/project-setup/create-application",
            filters: ["android", "ios", "flutter"],
          },
          {
            title: "Null safety",
            route: "lib/project-setup/null-safety",
            filters: ["flutter"],
          },
          {
            title: "Using Combine with Amplify",
            route: "lib/project-setup/combine",
            filters: ["ios"],
          },
          {
            title: "Async Programming Model",
            route: "lib/project-setup/async",
            filters: ["android"],
          },
          {
            title: "Kotlin Coroutines Support",
            route: "lib/project-setup/coroutines",
            filters: ["android"],
          },
          {
            title: "Using RxJava with Amplify",
            route: "lib/project-setup/rxjava",
            filters: ["android"],
          },
          {
            title: "Use existing AWS resources",
            route: "lib/project-setup/use-existing-resources",
            filters: ["android", "ios"],
          },
        ],
      },
      auth: {
        title: "Authentication",
        items: [
          {
            route: "/lib/auth/getting-started",
            title: "Getting Started",
            filters: ["js", "ios", "android", "flutter"],
          },
          {
            route: "/lib/auth/start",
            title: "Create or re-use existing backend",
            filters: ["js", "ios"],
          },
          {title: "emailpassword", filters: ["js", "ios"]},
          {title: "social", filters: ["js", "ios"]},
          {title: "mfa", filters: ["js", "ios"]},
          {title: "manageusers", filters: ["js", "ios"]},
          {title: "switch-auth", filters: ["js", "ios"]},
          {title: "customui", filters: ["js", "ios"]},
          {title: "advanced", filters: ["js", "ios"]},
          {title: "signin", filters: ["js", "ios"]},
          {title: "signin_with_custom_flow", filters: ["js", "ios"]},
          {title: "signin_web_ui", filters: ["js", "ios"]},
          {title: "social_signin_web_ui", filters: ["js", "ios"]},
          {title: "signin_next_steps", filters: ["js", "ios"]},
          {title: "guest_access", filters: ["js", "ios"]},
          {title: "auth-events", filters: ["js", "ios"]},
          {title: "user-attributes", filters: ["js", "ios"]},
          {title: "device_features", filters: ["js", "ios"]},
          {title: "password_management", filters: ["js", "ios"]},
          {title: "signOut", filters: ["js", "ios"]},
          {title: "access_credentials", filters: ["js", "ios"]},
          {title: "escapehatch", filters: ["js", "ios"]},
          {title: "overview", filters: ["js", "ios"]},
          {title: "existing-resources", filters: ["js", "ios"]},
        ],
      },
    },
  },
  ui: {
    productRoot: {
      title: "UI Components",
      route: "/ui",
    },
    items: {
      auth: {
        title: "Authentication",
        items: [
          {
            route: "/ui/auth/authenticator",
            title: "Authenticator",
            filters: ["react", "angular", "react-native"],
          },
        ],
      },
    },
  },
};

export default directory;
