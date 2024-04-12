import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IsUser } from './interface/user.interface';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let userModel: Model<User>;

  const mockUserService = {
    findByUserId: jest.fn()
  };

  const mockUser = {
    _id: '66117f8373e1d1fe7e1db23d',
    userId: "10",
    games: ["540"]
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserService
        }
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService)
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined()
  });

  describe('create', () => {
    it('should create user', async () => {
      const body = {
        userId: "10",
        games: []
      }

      const expectedResponse = {
        statusCode: HttpStatus.CREATED,
        message: 'User created successfully'
      };

      jest.spyOn(userService, 'create').mockResolvedValue(expectedResponse);

      const result = await userController.create(body);

      expect(userService.create).toHaveBeenCalledWith(body);
      expect(result).toEqual(expectedResponse)
    })

    it('should return that the user already exists', async () => {
      const body = {
        userId: "10",
        games: []
      };

      const expectedResponse = {
        statusCode: HttpStatus.OK,
        message: "The user already exists"
      };

      jest.spyOn(userService, 'create').mockResolvedValue(expectedResponse);

      const result = await userController.create(body);

      expect(userService.create).toHaveBeenCalledWith(body);
      expect(result).toEqual(expectedResponse);
    });
  })

  describe('addGameFavoriteUser', () => {
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

      const result = await userController.addGameFavoriteUser(body);

      expect(userService.addGame).toHaveBeenCalledWith(body)
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
  
      const result = await userController.addGameFavoriteUser(body);
     
      expect(userService.addGame).toHaveBeenCalledWith(body)
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('removeGameFavoriteUser', () => {
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

      const result = await userController.removeGameFavoriteUser(body);

      expect(userService.removeGame).toHaveBeenCalledWith(body)
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
  
      const result = await userController.removeGameFavoriteUser(body);
     
      expect(userService.removeGame).toHaveBeenCalledWith(body)
      expect(result).toEqual(expectedResponse);
    });
  });


  describe('getAllGamesByUser',  () => {
    it('should get all favorite games to user', async () => {

      const games = ["540", "40", "510"];

      jest.spyOn(userService, 'getAllGamesUser').mockResolvedValue(games);
  
      const result = await userController.getAllGamesUser({ userId: '10' });
  
      expect(userService.getAllGamesUser).toHaveBeenCalledWith({ userId: '10' });
      expect(result).toEqual(games);
    })

    it('should return not found when the id is invalid or the user does not exist', async () => {

      const expectedResponse = {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'The user does not exist',
      };
      
      jest.spyOn(userService, 'getAllGamesUser').mockResolvedValue(expectedResponse);
  
      const result = await userController.getAllGamesUser({ userId: 'invalid' });
  
      expect(userService.getAllGamesUser).toHaveBeenCalledWith({ userId: 'invalid' });
      expect(result).toEqual(expectedResponse);
    })
  })
});
