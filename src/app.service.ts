import { Injectable } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from './generated/i18n.generated';
import { I18N_LANG } from './config/config';

@Injectable()
export class AppService {
 async getHello(): Promise<string> {
    return 'hello'
}
}
