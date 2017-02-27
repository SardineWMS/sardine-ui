export default function showErrorMessage(data) {
    const message = data.obj;
    const simpleMessage = message.substring(message.indexOf("errorMsg='") + 10, message.indexOf("', field"));
    if (message.indexOf("errorMsg") === -1) {
        return data.message + "：" + message;
    }
    return data.message + "：" + simpleMessage;
}