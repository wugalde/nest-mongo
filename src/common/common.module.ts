import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.dapter';

@Module({
    providers: [AxiosAdapter],
    exports: [AxiosAdapter]
})
export class CommonModule {}
