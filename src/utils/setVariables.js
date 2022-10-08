import config from "../config";

const setVariables = async ({ context, schemaName, operation, id, ids }) => {
  if (config.env.startsWith("prod")) return;

  // determine variable keys per schemaName
  const nameId = `${schemaName.toLowerCase()}Id`;
  const nameIds = `${nameId}s`;
  const updateNameInput = `update${schemaName}Input`;
  const deleteNameInput = `delete${schemaName}Input`;

  if (operation === "delete") {
    context.variables[nameId] = "";
    context.variables[nameIds].pop();
    context.variables[updateNameInput][nameId] = "";
    context.variables[deleteNameInput][nameId] = "";
  } else if (operation === "create") {
    context.variables[nameId] = id;
    context.variables[nameIds].push(id);
    context.variables[updateNameInput][nameId] = id;
    context.variables[deleteNameInput][nameId] = id;
  } else if (operation === "read") {
    context.variables[nameId] = id;
    context.variables[updateNameInput][nameId] = id;
    context.variables[deleteNameInput][nameId] = id;
    if (ids) context.variables[nameIds] = ids;
  }
};

export default setVariables;
