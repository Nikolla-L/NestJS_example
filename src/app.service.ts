import { Injectable } from '@nestjs/common';

export interface Obj {
  name: string;
}

@Injectable()
export class AppService {
  getHello(): Obj {
    return { name: 'Niko' };
  }
}
