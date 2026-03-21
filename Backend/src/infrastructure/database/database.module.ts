import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../../database/schema';

@Module({
  providers: [
    {
      provide: 'DB',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL') ?? '';
        const client = new Pool({ connectionString });
        return drizzle(client, { schema });
      },
    },
  ],
  exports: ['DB'],
})
export class DatabaseModule {}
