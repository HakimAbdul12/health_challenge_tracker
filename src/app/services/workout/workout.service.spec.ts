import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';
import { User } from '../../models/user.model';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('submitWorkout', () => {
    it('should add a new workout to an existing user', () => {
      // Arrange
      service.setUserData([
        {
          id: 1,
          name: 'John Doe',
          workouts: [{ type: 'Running', minutes: 30 }]
        }
      ]);

      // Act
      service.submitWorkout('John Doe', 'Cycling', 45);
      const userData = service.getUserData();

      // Assert
      expect(userData.length).toBe(1);
      expect(userData[0].workouts.length).toBe(2);
      expect(userData[0].workouts[1]).toEqual({ type: 'Cycling', minutes: 45 });
    });

    it('should add a new user if the user does not exist', () => {
      // Act
      service.submitWorkout('Jane Smith', 'Swimming', 60);
      const userData = service.getUserData();

      // Assert
      expect(userData.length).toBe(1);
      expect(userData[0]).toEqual({
        id: 1,
        name: 'Jane Smith',
        workouts: [{ type: 'Swimming', minutes: 60 }]
      });
    });
  });

  describe('initializeUserData', () => {
    it('should set default data if local storage is empty', () => {
      // Act
      service.initializeUserData();
      const userData = service.getUserData();

      // Assert
      expect(userData.length).toBe(3);
      expect(userData).toEqual(service['defaultData']);
    });

    it('should not overwrite existing data', () => {
      // Arrange
      service.setUserData([{ id: 1, name: 'Existing User', workouts: [] }]);

      // Act
      service.initializeUserData();
      const userData = service.getUserData();

      // Assert
      expect(userData.length).toBe(1);
      expect(userData[0].name).toBe('Existing User');
    });
  });

  describe('getWorkoutById', () => {
    it('should return user data for a given ID', () => {
      // Arrange
      service.setUserData([
        { id: 1, name: 'John Doe', workouts: [] },
        { id: 2, name: 'Jane Smith', workouts: [] }
      ]);

      // Act
      const user = service.getWorkoutById(1);

      // Assert
      expect(user).toBeDefined();
      expect(user.id).toBe(1);
      expect(user.name).toBe('John Doe');
    });

    it('should return undefined for a non-existing ID', () => {
      // Act
      const user = service.getWorkoutById(999);

      // Assert
      expect(user).toBeUndefined();
    });
  });

  describe('getNextId', () => {
    it('should return the next available ID', () => {
      // Arrange
      service.setUserData([
        { id: 1, name: 'User 1', workouts: [] },
        { id: 2, name: 'User 2', workouts: [] }
      ]);

      // Act
      const nextId = service['getNextId'](service.getUserData());

      // Assert
      expect(nextId).toBe(3);
    });

    it('should return 1 if no users exist', () => {
      // Act
      const nextId = service['getNextId']([]);

      // Assert
      expect(nextId).toBe(1);
    });
  });
});
