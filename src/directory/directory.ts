const directory = {
  lib: {
    productRoot: {
      title: "Product Root",
      route: "/lib",
    },
    items: {
      notauth: {
        title: "Not authentication",
        items: [
          {title: "not-getting-started", filters: ["js", "ios"]},
          {title: "dont-start", filters: ["js", "ios"]},
        ],
      },
      auth: {
        title: "Authentication",
        items: [
          {
            route: "/lib/auth/getting-started",
            title: "Getting Started",
            filters: ["js", "ios"],
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
};

export default directory;
