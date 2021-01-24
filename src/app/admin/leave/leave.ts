export class Leave {
    public id: any;
    public employee: any;
    public reason: any;
    public approved: any;
    public leave_date: any;

    constructor(leave) {
          this.id = leave.id || "";
          this.employee = leave.employee || "";
          this.reason = leave.reason || "";
          this.approved = leave.approved || "";
          this.leave_date = leave.leave_date || "";
              
          }
  }
