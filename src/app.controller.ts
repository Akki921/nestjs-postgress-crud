import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { I18n, I18nContext, I18nLang } from 'nestjs-i18n';
import { I18nTranslations } from './generated/i18n.generated';
import { I18N_LANG } from './config/config';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@I18n() i18n:I18nContext<I18nTranslations>): Promise<string> {
    return await i18n.t('success.Teacher. ADD', {
      args: { name: 'Toon' },
      lang:I18N_LANG,
    });
  }
}
