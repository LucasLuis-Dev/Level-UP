import { Test, TestingModule } from '@nestjs/testing';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { HttpService } from '@nestjs/axios';
import { HttpStatus } from '@nestjs/common';
import { throwError } from 'rxjs';

describe('GamesController', () => {
  let gamesController: GamesController;
  let gamesService: GamesService;
  let httpService: HttpService


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [
        GamesService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            post: jest.fn()
          } 
        }
      ],
    }).compile();

    gamesController = module.get<GamesController>(GamesController);
    gamesService = module.get<GamesService>(GamesService);
    httpService = module.get<HttpService>(HttpService)
  });

  it('should be defined', () => {
    expect(gamesController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of games', async () => {
      const expectedResponse = [{
          "id": 540,
          "title": "Overwatch 2",
          "thumbnail": "https://www.freetogame.com/g/540/thumbnail.jpg",
          "short_description": "A hero-focused first-person team shooter from Blizzard Entertainment.",
          "game_url": "https://www.freetogame.com/open/overwatch-2",
          "genre": "Shooter",
          "platform": "PC (Windows)",
          "publisher": "Activision Blizzard",
          "developer": "Blizzard Entertainment",
          "release_date": "2022-10-04",
          "freetogame_profile_url": "https://www.freetogame.com/overwatch-2"
      },
      {
          "id": 521,
          "title": "Diablo Immortal",
          "thumbnail": "https://www.freetogame.com/g/521/thumbnail.jpg",
          "short_description": "Built for mobile and also released on PC, Diablo Immortal fills in the gaps between Diablo II and III in an MMOARPG environment.",
          "game_url": "https://www.freetogame.com/open/diablo-immortal",
          "genre": "MMOARPG",
          "platform": "PC (Windows)",
          "publisher": "Blizzard Entertainment",
          "developer": "Blizzard Entertainment",
          "release_date": "2022-06-02",
          "freetogame_profile_url": "https://www.freetogame.com/diablo-immortal"
      },];
      
      jest.spyOn(gamesService, 'findAll').mockResolvedValue(expectedResponse)

      const result = await gamesController.findAll();

      expect(gamesService.findAll).toHaveBeenCalled()
      expect(result).toEqual(expectedResponse);
    });

    it('should throw an error if HTTP request fails', async () => {
      (httpService.get as jest.Mock).mockReturnValueOnce(throwError(new Error('HTTP request failed')));

      await expect(gamesService.findAll()).rejects.toThrowError('HTTP request failed');
    });
  });

  describe('findOne', () => {
    it('should return one game wit gameId', async () => { 
      const gameId = 540
      const expectedResponse = {
        "id": 540,
        "title": "Overwatch 2",
        "thumbnail": "https://www.freetogame.com/g/540/thumbnail.jpg",
        "status": "Live",
        "short_description": "A hero-focused first-person team shooter from Blizzard Entertainment.",
        "description": "The tale of the hero organization Overwatch continues in Overwatch 2. This new take on the popular team shooter changes up things a little with five-man teams, redefined classes, and new playable characters. With the adjustment to 5v5, players now have more individual impact than in the previous game.\r\n\r\nChallenge yourself in all-new modes. Take control of a robot with your team in Push and take it to the enemy base before the enemy can take it from you. Explore all new areas, including iconic real-world cities such as New York, Rome, Monte Carlo, Toronto, and more.\r\n\r\nOverwatch 2 features an update schedule that drops new content every nine weeks. It also boasts a regular battle pass – both free and premium. This is where some of the game’s characters will be obtained.",
        "game_url": "https://www.freetogame.com/open/overwatch-2",
        "genre": "Shooter",
        "platform": "Windows",
        "publisher": "Activision Blizzard",
        "developer": "Blizzard Entertainment",
        "release_date": "2022-10-04",
        "freetogame_profile_url": "https://www.freetogame.com/overwatch-2",
        "minimum_system_requirements": {
            "os": "Windows 10 64-bit ",
            "processor": "Intel Core i3 or AMD Phenom X3 8650",
            "memory": "6 GB RAM",
            "graphics": "NVIDIA GeForce GTX 600 series, AMD Radeon HD 7000 series",
            "storage": "50 GB"
        },
        "screenshots": [
            {
                "id": 1334,
                "image": "https://www.freetogame.com/g/540/overwatch-2-1.jpg"
            },
            {
                "id": 1335,
                "image": "https://www.freetogame.com/g/540/overwatch-2-2.jpg"
            },
            {
                "id": 1336,
                "image": "https://www.freetogame.com/g/540/overwatch-2-3.jpg"
            }
        ]
      }

      jest.spyOn(gamesService, 'findOne').mockResolvedValue(expectedResponse)

      const response = await gamesController.findOne(gameId)

      expect(gamesService.findOne).toHaveBeenCalledWith(gameId)
      expect(response).toEqual(expectedResponse)
    })

    it('should return nothing because the game id does not exist', async () => {
      const invalidGameId = 600;

      const expectedResponse = {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'This game id is not found'
      };

      jest.spyOn(gamesService, 'findOne').mockResolvedValue(expectedResponse)

      const response = await gamesController.findOne(invalidGameId)

      expect(gamesService.findOne).toHaveBeenCalledWith(invalidGameId)
      expect(response).toEqual(expectedResponse) 
    })
  })

  describe('filterByCategory', () => {
    it('should return an array of games with the specified category', async () => {
      const category = "shooter";

      const expectedResponse = [
          {
              "id": 540,
              "title": "Overwatch 2",
              "thumbnail": "https://www.freetogame.com/g/540/thumbnail.jpg",
              "short_description": "A hero-focused first-person team shooter from Blizzard Entertainment.",
              "game_url": "https://www.freetogame.com/open/overwatch-2",
              "genre": "Shooter",
              "platform": "PC (Windows)",
              "publisher": "Activision Blizzard",
              "developer": "Blizzard Entertainment",
              "release_date": "2022-10-04",
              "freetogame_profile_url": "https://www.freetogame.com/overwatch-2"
          },
          {
              "id": 516,
              "title": "PUBG: BATTLEGROUNDS",
              "thumbnail": "https://www.freetogame.com/g/516/thumbnail.jpg",
              "short_description": "Get into the action in one of the longest running battle royale games PUBG Battlegrounds.",
              "game_url": "https://www.freetogame.com/open/pubg",
              "genre": "Shooter",
              "platform": "PC (Windows)",
              "publisher": "KRAFTON, Inc.",
              "developer": "KRAFTON, Inc.",
              "release_date": "2022-01-12",
              "freetogame_profile_url": "https://www.freetogame.com/pubg"
          },
      ]

      jest.spyOn(gamesService, 'filterByCategory').mockResolvedValue(expectedResponse)

      const response = await gamesController.filterByCategory(category)

      expect(gamesService.filterByCategory).toHaveBeenCalledWith(category)
      expect(response).toEqual(expectedResponse)
    })

    it('should return a not found message because the category does not exist', async () => {
      const invalidCategory = "Shoot";

      const expectedResponse = {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'This game category is not found'
      };

      jest.spyOn(gamesService, 'filterByCategory').mockResolvedValue(expectedResponse)

      const response = await gamesController.filterByCategory(invalidCategory) 

      expect(gamesService.filterByCategory).toHaveBeenCalledWith(invalidCategory)
      expect(response).toEqual(expectedResponse) 
    })
  })

  describe('filterByOrder', () => {
    it('should return an array of games ordered by the specified order', async () => {
      const order = "release-date";

      const expectedResponse = [
          {
            "id": 521,
            "title": "Diablo Immortal",
            "thumbnail": "https://www.freetogame.com/g/521/thumbnail.jpg",
            "short_description": "Built for mobile and also released on PC, Diablo Immortal fills in the gaps between Diablo II and III in an MMOARPG environment.",
            "game_url": "https://www.freetogame.com/open/diablo-immortal",
            "genre": "MMOARPG",
            "platform": "PC (Windows)",
            "publisher": "Blizzard Entertainment",
            "developer": "Blizzard Entertainment",
            "release_date": "2022-06-02",
            "freetogame_profile_url": "https://www.freetogame.com/diablo-immortal"
        },
        {
            "id": 517,
            "title": "Lost Ark",
            "thumbnail": "https://www.freetogame.com/g/517/thumbnail.jpg",
            "short_description": "Smilegate’s free-to-play multiplayer ARPG is a massive adventure filled with lands waiting to be explored, people waiting to be met, and an ancient evil waiting to be destroyed.",
            "game_url": "https://www.freetogame.com/open/lost-ark",
            "genre": "ARPG",
            "platform": "PC (Windows)",
            "publisher": "Amazon Games",
            "developer": "Smilegate RPG",
            "release_date": "2022-02-11",
            "freetogame_profile_url": "https://www.freetogame.com/lost-ark"
        }
      ]

      jest.spyOn(gamesService, 'filterByOrder').mockResolvedValue(expectedResponse)

      const response = await gamesController.filterByOrder(order)

      expect(gamesService.filterByOrder).toHaveBeenCalledWith(order)
      expect(response).toEqual(expectedResponse)
    })

    it('should return a not found message because the order does not exist', async () => {
      const invalidOrder = "date";

      const expectedResponse = {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'This game order is not found'
      };

      jest.spyOn(gamesService, 'filterByOrder').mockResolvedValue(expectedResponse)

      const response = await gamesController.filterByOrder(invalidOrder)  

      expect(gamesService.filterByOrder).toHaveBeenCalledWith(invalidOrder) 
      expect(response).toEqual(expectedResponse) 
    })
  })
});
