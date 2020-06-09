import { LightControlCapabilities } from './light-control-capabilities';
import { LightStreamingCapabilities } from './light-streaming-capabilities';

export class LightCapabilities {
    certified: boolean;
    control: LightControlCapabilities;
    streaming: LightStreamingCapabilities;
}