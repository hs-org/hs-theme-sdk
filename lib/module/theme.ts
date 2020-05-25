import { DynamicThemeModule } from "./dynamic";

export interface ThemeModule {

    /**
     * Name of the corresponding module.
     */
    name: string

    /**
     * Returns whether this module is a dynamic module.
     */
    isDynamic(): boolean

    /**
     * Returns a dynamic representation from that module or
     * the module itself if it is already a dynamic module.
     */
    asDynamic(): DynamicThemeModule

    /**
     * Returns the value of a variable or `undefined` if the variable does not exist
     * @param key the variable name
     */
    getVar(key: string): any | undefined

    /**
     * Checks if a variable is defined in the module,
     * variables with a null value are treated as defined.
     * @param key the variable name
     */
    hasVar(key: string): boolean

}

export abstract class AbstractThemeModule implements ThemeModule {

    protected vars = new Map<string, any>()

    protected constructor(public name: string) {
        this.name = name
    }

    getVar(key: string): any | undefined {
        return this.vars.get(key);
    }

    hasVar(key: string): boolean {
        return this.vars.has(key)
    }

    isDynamic(): boolean {
        return false
    }

    asDynamic(): DynamicThemeModule {
        if (this.isDynamic())
            return this as unknown as DynamicThemeModule
        
        throw new Error("No dynamic conversion implemented.")
    }

}