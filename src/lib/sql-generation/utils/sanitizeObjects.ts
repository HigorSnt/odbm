interface SanitizedObject {
  script: string;
  name?: string;
  grants?: string[];
}

export const sanitizedObjects = (objects: any[]): SanitizedObject[] => {
  return objects.map(el => <SanitizedObject>{
      name: el.name,
      script: el.script,
      grants: el.grants?.map((grant: any) => grant.script),
    },
  );
};
