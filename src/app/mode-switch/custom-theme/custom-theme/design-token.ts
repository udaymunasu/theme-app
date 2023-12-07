export interface tokens {
    type: string;
    var: string;
    name?: string;
    value?: string;
    hsl?;
    string;
}

export class DesignTokens {
    public static addTokens(jsonInput: any, className: any) {
        if (jsonInput == null) {
            return;
        }

        let defaultTokens: any = {};
        let darkTokens: any = {};
        Object.keys(jsonInput).forEach((key: any) => {
            if (jsonInput[key].type == 'color') {
                Object.keys(jsonInput[key].values).forEach((category: any) => {
                    Object.keys(jsonInput[key].values[category]).forEach((item: any) => {
                        let value = jsonInput[key].values[category][item].values ? jsonInput[key].values[category][item].values : `hsl(${jsonInput[key].values[category]['base'].hsl.h + jsonInput[key].values[category][item].hsl.h}, ${jsonInput[key].values[category]['base'].hsl.s + jsonInput[key].values[category][item].hsl.s}%, ${jsonInput[key].values[category]['base'].hsl.l + jsonInput[key].values[category][item].hsl.l}%)`;
                        if (item != 'base') {
                            defaultTokens[`--ds-${jsonInput[key].values[category][item].var}`] = value;
                            const length: number = Object.keys(jsonInput[key].values[category]).length
                            darkTokens[`--ds-${(jsonInput[key].values[category][item].var).split('-')[0]}-${(length - parseInt(item))}`] = value
                        }
                    });
                });
            } else {
                Object.keys(jsonInput[key].values).forEach((category: any) => {
                    Object.keys(jsonInput[key].values[category]).forEach((item: any) => {
                        let value = jsonInput[key].values[category][item].values ? jsonInput[key].values[category][item].values : ``;
                        defaultTokens[`--ds-${jsonInput[key].values[category][item].var}`] = value;
                    });
                });
            }
        });
        this.appendStyle(defaultTokens, darkTokens, className)
    }

    public static appendStyle(defaultTokens: any, darkTokens: any, className: any = "tokenClass"): void {
        const element = document.getElementById('appendStyle');
        element?.remove();
        const style = document.createElement('style');
        style.id = 'appendStyle';
        style.innerHTML = `
            ${className.join('.')} {
                ${Object.entries(defaultTokens).map(([k,v]) => `${k}: ${v}`).join(';')}
            }
            ${className.join('.')} .dark-mode{
                ${Object.entries(darkTokens).map(([k,v]) => `${k}: ${v}`).join(';')}
            }
            ${className.join('.')} .light-mode{
                ${Object.entries(defaultTokens).map(([k,v]) => `${k}: ${v}`).join(';')}
            }
        `;
    document.head.appendChild(style);
    }
    
}
