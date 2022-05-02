// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { useData } from "./utils";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "code-memory-extension" is now active!'
  );

  // let disposable = vscode.commands.registerCommand(
  //   "codeMemory.login",
  //   async function () {
  //     let isLogin: any = await checkLogin();
  //     if (isLogin) {
  //     } else {
  //       vscode.window
  //         .showInputBox({
  //           // 这个对象中所有参数都是可选参数
  //           password: false, // 输入内容是否是密码
  //           ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
  //           placeHolder: "请输入用户名或手机号", // 在输入框内的提示信息
  //           prompt: "用户名/手机号", // 在输入框下方的提示信息
  //         })
  //         .then(function (msg1) {
  //           vscode.window
  //             .showInputBox({
  //               // 这个对象中所有参数都是可选参数
  //               password: true, // 输入内容是否是密码
  //               ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
  //               placeHolder: "请输入密码", // 在输入框内的提示信息
  //               prompt: "密码", // 在输入框下方的提示信息
  //             })
  //             .then(function (msg2) {

  //             });
  //         });
  //     }
  //   }
  // );

  useData(context);
}

// this method is called when your extension is deactivated
export function deactivate() {}
