import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavoriteModule } from './favorites/favorites.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { TrackEntity } from './track/track.entity';
import { AlbumEntity } from './album/album.entity';
import { ArtistEntity } from './artist/artist.entity';
import { FavoriteEntity } from './favorites/favorites.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoriteModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: +process.env.PORT_POSTGRES,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [UserEntity, TrackEntity, AlbumEntity, ArtistEntity, FavoriteEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
