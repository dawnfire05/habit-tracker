import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { jwtConstants } from './constants';
import { Strategy } from 'passport-local';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    //jwt가 decode 되었다면 valid token을 받은 것. 따라서 따로 처리가 필요 없음.
    //const user = this.userService.getUserById(payload.sub);
    return { userId: payload.sub, username: payload.username };
  }
  //validate()에서 리턴된 값을 바탕으로 user object를 만들어 Request object에 포함 시킴.
}
