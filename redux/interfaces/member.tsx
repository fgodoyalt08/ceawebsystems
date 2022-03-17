export interface IMemberData {
    first_name: string;
    last_name: string;
    social_security_number: string;
    iaff_member_number: string;
    union_membership_status_id: string;
    birth_date: any;
    join_date: any;
    employ_date: any;
    badge_number: string;
    sick_plan_id: string;
    email: string;
};

export interface IMemberDispatch {
    type: string
}

export interface IMemberReducer {
    error?: any;
    request: boolean;
    data?: any;
  }