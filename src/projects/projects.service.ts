import * as fs from 'fs';
import * as path from 'path';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Projects } from './projects.entity/projects.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private projectRepo: Repository<Projects>,
  ) {}

  async create(data: Partial<Projects>): Promise<Projects> {
    const project = this.projectRepo.create(data);
    return this.projectRepo.save(project);
  }

  async findAll(): Promise<Projects[]> {
    return this.projectRepo.find();
  }

  async findOne(id: number): Promise<Projects> {
    const project = await this.projectRepo.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(id: number, data: Partial<Projects>): Promise<Projects> {
    const project = await this.findOne(id); // check if exists
    Object.assign(project, data); // merge new values
    return this.projectRepo.save(project);
  }

  async delete(id: number): Promise<{ deleted: boolean }> {
    const project = await this.findOne(id); // make sure it exists

    // Delete head image if it exists
    if (project.headImage) {
      const filePath = path.join(__dirname, '..', 'uploads', project.headImage);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete extra images if they exist
    if (project.extraImages && Array.isArray(project.extraImages)) {
      for (const img of project.extraImages) {
        const filePath = path.join(__dirname, '..', 'uploads', img);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }

    const result = await this.projectRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return { deleted: true };
  }

  async findbyTitle(title: string) {
    return this.projectRepo.findOne({
      where: { Title: title },
    });
  }
}
