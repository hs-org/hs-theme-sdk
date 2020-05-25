import { ThemeModule, AbstractThemeModule } from "./theme"

export interface DynamicThemeModule extends ThemeModule {

    /**
     * Updates the value of a variable, if the variable does not exist, a generic error will be thrown.
     * If the value passed is undefined, the variable will be "removed" from the module.
     * @param key the variable name
     * @param value the variable new value
     */
    updateVar(key: string, value: any | undefined): void

}

export class GenericDynamicThemeModule extends AbstractThemeModule implements DynamicThemeModule {
    
    isDynamic(): boolean {
        return true
    }
    
    updateVar(key: string, value: any): void {
        this.vars.set(key, value)
    }

}