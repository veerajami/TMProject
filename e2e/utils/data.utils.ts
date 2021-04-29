export class DataUtils {
  public static async getUniqueString() {
    const date: Date = new Date();
    return (
      await this.getRandomText() +
      date.getDay() +
      date.getMonth() +
      date.getFullYear() +
      date.getHours() +
      date.getMinutes() +
      date.getMilliseconds()
    );
  }
  public static async getRandomText() {

      const characters: string =
        "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
      let randomstring = "";
      for (let i = 0; i < 7; i++) {
        const rnum = Math.floor(Math.random() * characters.length);
        randomstring += characters.substring(rnum, rnum + 1);
       }
       const output = randomstring.charAt(0).toUpperCase() + randomstring.slice(1).toLowerCase();
       return output;
  }

  public async getMonthFromDate(date: string) {
    const vals = date.split("/");
    return new Date(Number(vals[2]), Number(vals[1]) - 1, Number(vals[0]))
      .toDateString()
      .split(" ")[1];
  }
}
