import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { IsUser } from './interface/user.interface';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { HttpStatus } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let userModel: Model<User>;

  const mockUser = {
    _id: '66117f8373e1d1fe7e1db23d',
    userId: "10",
    games: ["540"]
  };

  const mockUserService = {
    findByUserId: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserService
        }
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });


  describe('create', () => {
    it('should create the user', async () => {
      const newUser = {
        userId: '19',
        games: []
      };

      const expectedResponse = {
        statusCode: HttpStatus.CREATED,
        message: 'User created successfully'
      };

      jest.spyOn(userService, 'create').mockResolvedValue(expectedResponse);

      const result = await userService.create(newUser);
      
      expect(result).toEqual(expectedResponse);
    });

    it('should return that the user already exists', async () => {
      const existingUser = {
        userId: "10",
        games: []
      };

      const expectedResponse = {
        statusCode: HttpStatus.OK,
        message: "The user already exists"
      };

      jest.spyOn(userService, 'create').mockResolvedValue(expectedResponse);

      const result = await userService.create(existingUser);
      
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('addGame', () => {
    it('should receive the user and respond that the user\'s data has been updated', async () => {
      const body = {
        userId: "10",
        gameId: "400"
      };

      const expectedResponse = {
        statusCode: HttpStatus.OK,
        message: "The user's data has been updated"
      };

      jest.spyOn(userService, 'addGame').mockResolvedValue(expectedResponse);

      const result = await userService.addGame(body);

      expect(result).toEqual(expectedResponse);
    });

    it('should return an error message when the user is not found', async () => {
      const body = {
        userId: "nonExistentUserId",
        gameId: "400"
      };
  
      const expectedResponse = {
        statusCode: HttpStatus.NOT_FOUND,
        message: "The user does not exist"
      };

      jest.spyOn(userService, 'addGame').mockResolvedValueOnce(expectedResponse);
  
      const result = await userService.addGame(body);
     
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('removeGame', () => {
    it('should receive the user and respond that the user\'s data has been updated', async () => {
      const body = {
        userId: "10",
        gameId: "400"
      };

      const expectedResponse = {
        statusCode: HttpStatus.OK,
        message: "The user's data has been updated"
      };

      jest.spyOn(userService, 'removeGame').mockResolvedValue(expectedResponse);

      const result = await userService.removeGame(body);

      expect(result).toEqual(expectedResponse);
    });

    it('should return an error message when the user is not found', async () => {
      const body = {
        userId: "nonExistentUserId",
        gameId: "400"
      };
  
      const expectedResponse = {
        statusCode: HttpStatus.NOT_FOUND,
        message: "The user does not exist"
      };

      jest.spyOn(userService, 'removeGame').mockResolvedValueOnce(expectedResponse);
  
      const result = await userService.removeGame(body);
     
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('getAllGamesUser', () => {
    it('should return a list with game ids of the user', async () => {
      const query = [ "540", "40", "510"] 
      const userId = "10"
      
      jest.spyOn(userService, 'getAllGamesUser').mockResolvedValue(query)

      const result = await userService.getAllGamesUser({ userId })

      expect(result).toEqual(query)
    });

    it('should return not found when the id is invalid or the user does not exist', async () => {
      const invalidUserId = 'invalid-user-id'

      const expectedResponse = {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'The user does not exist',
      };

      jest.spyOn(userService, 'getAllGamesUser').mockResolvedValue(expectedResponse);

      const result = await userService.getAllGamesUser({ userId: invalidUserId });

      expect(result).toEqual(expectedResponse);
    });
  });

  describe('findByUserId', () => {
    it('should return a user by id', async () => {
      // ✅ CORREÇÃO AQUI
      jest.spyOn(userService, 'findByUserId').mockResolvedValue(mockUser as unknown as IsUser);

      const result = await userService.findByUserId(mockUser.userId);

      expect(userService.findByUserId).toHaveBeenCalledWith(mockUser.userId);
      expect(result).toEqual(mockUser);
    });

    it('should return not found when the id is invalid or the user does not exist', async () => {
      const invalidUserId = 'invalid-user-id';

      // ✅ Null já funciona sem casting
      jest.spyOn(userService, 'findByUserId').mockResolvedValue(null);

      const result = await userService.findByUserId(invalidUserId);

      expect(result).toEqual(null);
    });
  });
});
