import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Projects } from './projects.entity/projects.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'headImage', maxCount: 1 },
        { name: 'extraImages', maxCount: 10 },
      ],
      {
        storage: diskStorage({
          destination: './uploads/projects',
          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
      },
    ),
  )
  async create(
    @Body() body: Partial<Projects>,
    @UploadedFiles()
    files: {
      headImage?: Express.Multer.File[];
      extraImages?: Express.Multer.File[];
    },
  ): Promise<Projects> {
    const headImage = files.headImage?.[0];
    const extraImages = files.extraImages || [];

    const projectData: Partial<Projects> = {
      Title: body.Title,
      Description: body.Description,
      headImage: headImage
        ? `/uploads/projects/${headImage.filename}`
        : undefined,
      extraImages: extraImages.map(
        (file) => `/uploads/projects/${file.filename}`,
      ),
    };

    return this.projectService.create(projectData);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Projects> {
    return this.projectService.findOne(+id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.projectService.delete(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Projects) {
    return this.projectService.update(+id, body);
  }

  @Get()
  async findByTitle(@Query('Title') title?: string) {
    if (title) {
      return this.projectService.findbyTitle(title);
    }
    return this.projectService.findAll();
  }
}
