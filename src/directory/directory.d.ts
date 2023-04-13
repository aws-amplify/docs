export type DirectoryItem = {
  /**
   * Title used for sidenav link, page title, and page heading
   */
  title: string;
  filters?: string[];
  /**
   * Control whether the title should be displayed as inline code
   * @default false
   */
  isCodeTitle?: boolean;
  route: string;
};

export type Directory = {
  productRoot: {
    title: string;
    route: string;
  };
  items: Record<
    string,
    {
      title: string;
      items: DirectoryItem[];
      route?: string;
      filters?: string[];
    }
  >;
};
