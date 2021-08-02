const { generateFileUrl } = require("@appHelpers/aws/s3");
const { existProject } = require("@appValidations/project");
const { validateProjectUserAuthService } = require("@appServices/projectUsers");


async function generateFileUrlService(jsonFile, userName) {
    const { projectName, file, contentType, fileName } = jsonFile;

    const exist = await existProject(projectName);
    if (!exist.isValid) {
      return { status: "error", message: "Error, el proyecto no existe" };
    }
    const auxAuth = await validateProjectUserAuthService(projectName, userName);
    if (!auxAuth.isValid) {
      return {
        status: "error",
        message: "Error, el usuario no pertenece al proyecto",
      };
    }

    const fullName = await generateName(projectName, fileName);
    const url = await generateFileUrl(file, contentType, fullName);
    if (url) {
        return {
            status: "ok",
            url
          }; 
    }else{
        return {
            status: "error",
            message: "Error, no se pudo guardar el archivo",
          };
    }

}

async function generateName(projectName, fileName){
    const date = new Date();
    const fullName = projectName+"_"+`${date.toDateString()}`.replace(/ /g, "")+"_"+fileName
    return fullName;
}

module.exports = { generateFileUrlService };
