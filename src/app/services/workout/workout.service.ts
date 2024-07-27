import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private userDataKey = 'userData';
  constructor() { }

  submitWorkout(name: string, type: string, minutes: number) {
    const userData = this.getUserData();
    let user = userData.find((u: any) => u.name === name);

    if (user) {
      // User exists, update existing user
      const workout = user.workouts.find((w: any) => w.type === type);
        user.workouts.push({ type, minutes });
    }
    else {
      // User does not exist, add new user
      const newUser = {
        id: this.getNextId(userData),
        name,
        workouts: [{ type, minutes }]
      };
      userData.push(newUser);
    }

    this.setUserData(userData);
    return
  }

   // Initialize user data if not present
   initializeUserData() {
    const userData = this.getUserData();
    if (!userData || userData.length === 0) {
      const defaultData = [
        {
          id: 1,
          name: 'John Doe',
          workouts: [
            { type: 'Running', minutes: 30 },
            { type: 'Cycling', minutes: 45 }
          ]
        },
        {
          id: 2,
          name: 'Jane Smith',
          workouts: [
            { type: 'Swimming', minutes: 60 },
            { type: 'Running', minutes: 20 }
          ]
        },
        {
          id: 3,
          name: 'Mike Johnson',
          workouts: [
            { type: 'Yoga', minutes: 50 },
            { type: 'Cycling', minutes: 40 }
          ]
        }
      ];
      this.setUserData(defaultData);
    }
  }

  getUserData() {
    return JSON.parse(localStorage.getItem(this.userDataKey) || '[]');
  }

  setUserData(data: any) {
    localStorage.setItem(this.userDataKey, JSON.stringify(data));
  }

   // Get the next available ID
   private getNextId(userData: any[]): number {
    return userData.length > 0 ? Math.max(...userData.map((u: any) => u.id)) + 1 : 1;
  }
}
