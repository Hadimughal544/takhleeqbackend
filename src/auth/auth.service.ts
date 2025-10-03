import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminEntity } from 'src/admin/admin.entity.ts/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepo: Repository<AdminEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const existing = await this.adminRepo.findOne({ where: { email } });
    if (existing) throw new ConflictException('Admin already exists');

    const hashed = await bcrypt.hash(password, 10);
    const admin = this.adminRepo.create({ email, password: hashed });
    const saved = await this.adminRepo.save(admin);
    return saved;
  }

  async validateAdmin(email: string, password: string) {
    const admin = await this.adminRepo.findOne({ where: { email } });
    if (!admin) throw new UnauthorizedException('invalid credentials');

    const matched = await bcrypt.compare(password, admin.password);
    if (!matched) throw new UnauthorizedException('invalid credentials');

    return admin;
  }

  async login(admin: AdminEntity) {
    const payload = { sub: admin.id, email: admin.email, role: admin.role };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
