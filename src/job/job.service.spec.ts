// import { BadRequestException, NotFoundException } from '@nestjs/common';
// import { Test } from '@nestjs/testing';
// import { UserStatus } from '../auth/user-status.enum';
// import { ItemStatus } from './item-status.enum';
// import { ItemsService } from './items.service';
// import { Repository } from 'typeorm';
// import { Item } from '../entities/item.entity';
// import { getRepositoryToken } from '@nestjs/typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { JobService } from './job.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

describe('JobService', () => {
  let service: JobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ConfigModule.forRoot({ isGlobal: true })],
      providers: [JobService],
    }).compile();

    service = module.get<JobService>(JobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

// const mockUser1 = {
//   id: '1',
//   username: 'test1',
//   password: '1234',
//   status: UserStatus.PREMIUM,
// };
// const mockUser2 = {
//   id: '2',
//   username: 'test2',
//   password: '1234',
//   status: UserStatus.FREE,
// };

// describe('ItemsServiceTest', () => {
//   let itemsService;
//   let itemRepository;

//   beforeEach(async () => {
//     const module = await Test.createTestingModule({
//       providers: [
//         ItemsService,
//         {
//           provide: getRepositoryToken(Item),
//           useClass: Repository,
//         },
//       ],
//     }).compile();
// ここでモジュールからのインスタンスを受け取る
//     itemsService = module.get<ItemsService>(ItemsService);
//     itemRepository = module.get<Repository<Item>>(getRepositoryToken(Item));
//   });

//   describe('findAll', () => {
//     it('正常系', async () => {
//       const expected: Item[] = [];

// このクラスの、このメソッド呼ばれたら、こうしてください！！って処理
//       jest
//         .spyOn(itemRepository, 'find')
//         .mockImplementation(async () => expected);
//       const result = await itemsService.findAll();

//       expect(result).toEqual(expected);
//     });
//   });

//   describe('findById', () => {
//     it('正常系', async () => {
//       const expected = {
//         id: 'test-id',
//         name: 'PC',
//         price: 50000,
//         description: '',
//         status: ItemStatus.ON_SALE,
//         createdAt: '',
//         updatedAt: '',
//         userId: mockUser1.id,
//         user: mockUser1,
//       };

//       jest
//         .spyOn(itemRepository, 'findOneBy')
//         .mockImplementation(async () => expected);
//       const result = await itemsService.findById('test-id');
//       expect(result).toEqual(expected);
//     });

//     it('異常系: 商品が存在しない', async () => {
//       jest
//         .spyOn(itemRepository, 'findOneBy')
//         .mockImplementation(async () => null);
//       await expect(itemsService.findById('test-id')).rejects.toThrow(
//         NotFoundException,
//       );
//     });
//   });

//   describe('create', () => {
//     it('正常系', async () => {
//       const expected = {
//         id: 'test-id',
//         name: 'PC',
//         price: 50000,
//         description: '',
//         status: ItemStatus.ON_SALE,
//         createdAt: '',
//         updatedAt: '',
//         userId: mockUser1.id,
//         user: mockUser1,
//       };

//       jest
//         .spyOn(itemRepository, 'create')
//         .mockImplementation(async () => expected);
//       jest.spyOn(itemRepository, 'save').mockImplementation(async () => []);
//       const result = await itemsService.create(
//         { name: 'PC', price: 50000, describe: '' },
//         mockUser1,
//       );
//       expect(result).toEqual(expected);
//     });
//   });

//   describe('updateStatus', () => {
//     const mockItem = {
//       id: 'test-id',
//       name: 'PC',
//       price: 50000,
//       description: '',
//       status: ItemStatus.ON_SALE,
//       createdAt: '',
//       updatedAt: '',
//       userId: mockUser1.id,
//       user: mockUser1,
//     };
//     it('正常系', async () => {
//       jest
//         .spyOn(itemRepository, 'findOneBy')
//         .mockImplementation(async () => mockItem);
//       const spy = jest
//         .spyOn(itemRepository, 'update')
//         .mockImplementation(() => mockItem);
//       await itemsService.updateStatus('test-id', mockUser2);
//       expect(spy).toHaveBeenCalled();
//     });

//     it('異常系: 自身の商品を購入', async () => {
//       jest
//         .spyOn(itemRepository, 'findOneBy')
//         .mockImplementation(async () => mockItem);
//       await expect(
//         itemsService.updateStatus('test-id', mockUser1),
//       ).rejects.toThrow(BadRequestException);
//     });
//   });

//   describe('delete', () => {
//     const mockItem = {
//       id: 'test-id',
//       name: 'PC',
//       price: 50000,
//       description: '',
//       status: ItemStatus.ON_SALE,
//       createdAt: '',
//       updatedAt: '',
//       userId: mockUser1.id,
//       user: mockUser1,
//     };
//     it('正常系', async () => {
//       jest
//         .spyOn(itemRepository, 'findOneBy')
//         .mockImplementation(async () => mockItem);

//       const deleteResponse = { affected: 1 };
//       const spy = jest
//         .spyOn(itemRepository, 'delete')
//         .mockImplementation(async () => deleteResponse);
//       await itemsService.delete('test-id', mockUser1);
//       expect(spy).toHaveBeenCalled();
//     });

//     it('異常系: 他人の商品を削除', async () => {
//       jest
//         .spyOn(itemRepository, 'findOneBy')
//         .mockImplementation(async () => mockItem);
//       await expect(itemsService.delete('test-id', mockUser2)).rejects.toThrow(
//         BadRequestException,
//       );
//     });
//   });
// });
