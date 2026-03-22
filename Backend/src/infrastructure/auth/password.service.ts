import * as argon2 from 'argon2';
import type { IPasswordService } from '../../domain/interfaces/password-service.interface';

export class PasswordService implements IPasswordService {
  async hash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  async verify(password: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}
