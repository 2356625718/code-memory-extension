const os = require("os");
const fs = require("fs");
import * as vscode from "vscode";
import codeRequest from "./request/code";

// 读取用户根目录
const homedir = os.homedir();

// 读取数据
export const useData = async (context: vscode.ExtensionContext) => {
  // 读取软件端数据
  let data = await readFile();
  const languages = ["javascript", "python", "java", "go", "cpp", "c"];
  languages.forEach((item: any) => {
    const provider = vscode.languages.registerCompletionItemProvider(item, {
      provideCompletionItems(document, position) {
        let res: any = [];
        data.forEach((item: any) => {
          // 配置代码智能补全触发字段及注释
          let completionItem = new vscode.CompletionItem({
            label: item.label,
            description: item.description,
          });
          // 支持模糊查询
          completionItem.filterText = item.label.split("").join("-");
          // 配置补全字段
          completionItem.insertText = new vscode.SnippetString(item.body);
          res.push(completionItem);
        });
        return res;
      },
    });
    context.subscriptions.push(provider);
  });
};

// 读取本地数据
const readData = () => {
  return new Promise((resolve, reject) => {
    fs.exists(homedir + "/code-memory/snippets.json", (exists: boolean) => {
      if (exists) {
        fs.readFile(
          homedir + "/code-memory/snippets.json",
          (err: any, data: any) => {
            if (err) reject(err);
            else resolve(JSON.parse(data.toString()));
          }
        );
      } else {
        reject("文件不存在");
      }
    });
  });
};

// 读取设置
const readSetting = () => {
  return new Promise((resolve, reject) => {
    fs.exists(homedir + "/code-memory/setting.json", (exists: boolean) => {
      if (exists) {
        fs.readFile(
          homedir + "/code-memory/setting.json",
          (err: any, data: any) => {
            if (err) reject(err);
            else resolve(JSON.parse(data.toString()));
          }
        );
      } else {
        reject("文件不存在");
      }
    });
  });
};

// 读取用户
const readUser = () => {
  return new Promise((resolve, reject) => {
    fs.exists(homedir + "/code-memory/user.json", (exists: boolean) => {
      if (exists) {
        fs.readFile(
          homedir + "/code-memory/user.json",
          (err: any, data: any) => {
            if (err) reject(err);
            else resolve(JSON.parse(data.toString()));
          }
        );
      } else {
        reject("文件不存在");
      }
    });
  });
};

// 读入文件
const readFile = async () => {
  let user: any = await readUser();
  try {
    if (user?.id) {
      let setting: any = await readSetting();
      if (setting?.editor && setting?.current) {
        let data: any;
        // position为true时读取本地文件,position为false时读取云服务器
        if (setting.current.position) {
          data = await readData();
          data = data.data.map((item: any) => {
            return {
              label: item.title,
              description: item.description,
              body: item.code,
            };
          });
        } else {
          let res = await codeRequest.getCode({
            userId: user.id,
          });
          if (res.data.status) {
            data = res.data.data.map((item: any) => {
              return {
                label: item.title,
                description: item.description,
                body: item.content,
              };
            });
          }
        }
        return data;
      }
    }
  } catch (e) {
    console.log(e);
  }
};
