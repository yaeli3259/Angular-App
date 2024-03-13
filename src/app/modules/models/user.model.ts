export class User {
    code: number;
    name: string;
    address: string;
    mail: string;
    password: string;
  
    constructor(code:number, name: string, address: string, mail: string, password: string) {
      this.code = code;
      this.name = name;
      this.address = address;
      this.mail = mail;
      this.password = password;
    }
  }
  