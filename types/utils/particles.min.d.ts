declare function hexToRgb(e: any): {
    r: number;
    g: number;
    b: number;
} | null;
declare function clamp(e: any, a: any, t: any): number;
declare function isInArray(e: any, a: any): boolean;
declare function pJS(e: any, a: any): void;
declare class pJS {
    constructor(e: any, a: any);
    pJS: {
        canvas: {
            el: Element | null;
            w: any;
            h: any;
        };
        particles: {
            number: {
                value: number;
                density: {
                    enable: boolean;
                    value_area: number;
                };
            };
            color: {
                value: string;
            };
            shape: {
                type: string;
                stroke: {
                    width: number;
                    color: string;
                };
                polygon: {
                    nb_sides: number;
                };
                image: {
                    src: string;
                    width: number;
                    height: number;
                };
            };
            opacity: {
                value: number;
                random: boolean;
                anim: {
                    enable: boolean;
                    speed: number;
                    opacity_min: number;
                    sync: boolean;
                };
            };
            size: {
                value: number;
                random: boolean;
                anim: {
                    enable: boolean;
                    speed: number;
                    size_min: number;
                    sync: boolean;
                };
            };
            line_linked: {
                enable: boolean;
                distance: number;
                color: string;
                opacity: number;
                width: number;
            };
            move: {
                enable: boolean;
                speed: number;
                direction: string;
                random: boolean;
                straight: boolean;
                out_mode: string;
                bounce: boolean;
                attract: {
                    enable: boolean;
                    rotateX: number;
                    rotateY: number;
                };
            };
            array: never[];
        };
        interactivity: {
            detect_on: string;
            events: {
                onhover: {
                    enable: boolean;
                    mode: string;
                };
                onclick: {
                    enable: boolean;
                    mode: string;
                };
                resize: boolean;
            };
            modes: {
                grab: {
                    distance: number;
                    line_linked: {
                        opacity: number;
                    };
                };
                bubble: {
                    distance: number;
                    size: number;
                    duration: number;
                };
                repulse: {
                    distance: number;
                    duration: number;
                };
                push: {
                    particles_nb: number;
                };
                remove: {
                    particles_nb: number;
                };
            };
            mouse: {};
        };
        retina_detect: boolean;
        fn: {
            interact: {};
            modes: {};
            vendors: {};
        };
        tmp: {};
    };
}
