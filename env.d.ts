declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // eagle资源地址
      LIBRARY: string;
    }
  }
}

namespace EagleUse {
  export type Menu = "/" | "/tags" | "/not-tag" | "recycle" | "/folder/";

  // 图片
  export interface Image {
    id: string;
    name: string;
    size: number;
    // 创建日期
    btime: number;
    mtime: number;
    // 扩展名
    ext: string;
    url: string;
    // 注释
    annotation: string;
    // 添加日期
    modificationTime: number;
    width: number;
    height: number;
    palettes: string;
    lastModified: number;
    isDeleted: boolean;
    deletedTime: number;
    // json字符串
    processingPalette: string;
    noThumbnail: boolean;
    star: number;
    tags?: Tag[];
    folders?: Folder[];
  }

  // 文件夹
  export interface Folder {
    id: string;
    name: string;
    description: string;
    pid: any;
    modificationTime: number;
    iconColor: any;
    icon: any;
    password: string;
    passwordTips: string;
    children?: Folder[];
    _count: {
      images: number;
    };
    images?: Image[];
  }

  // 标签
  export interface Tag {
    id: string;
    name: string;
    starred: boolean;
    _count: {
      images: number;
    };
    tagsGroups: TagsGroupsItem[];
  }

  export interface ImagePalette {
    color: number[];
    ratio: number;
    $$hashKey: string;
  }

  export interface TagsGroupsItem {
    id: string;
    name: string;
    color?: string;
    tags: Tag[];
  }

  type Ext = "jpg" | "png" | "jpeg" | "gif" | "webp";

  export interface SearchParams {
    // 标签
    tags?: string[];
    //   尺寸
    size?: {
      width: {
        min: number;
        max: number;
      };
      height: {
        min: number;
        max: number;
      };
    };
    annotation?: string;
    // 排序
    orderBy?: {
      field: string;
      by: "desc" | "asc";
    };
    // 扩展名
    ext?: string | Ext;
    // 评级
    star?: number;
    // 需要包含返回的字段
    includes?: ("tags" | "folders")[];
  }
}
