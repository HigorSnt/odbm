export declare type Definition = 'Functions' | 'Packages' | 'Views' | 'Triggers' | 'Procedures' | 'Sequences' | 'Tables';
export declare type Language = 'plsql';
export declare const sqlGeneration: (type: Definition, language: Language, sourceObject: any, targetObject: any) => string;
