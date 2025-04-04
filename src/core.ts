/**
 * CoreLibrary is a functional singleton that serves as the main entry point for the library.
 * It ensures only one instance exists throughout the application lifecycle.
 */

// Private state
let instance: CoreLibraryState | null = null;

/**
 * Interface defining the options for the CoreLibrary
 */
export interface CoreLibraryOptions {
  /**
   * Optional configuration options
   */
  debug?: boolean;
  /**
   * Optional custom initialization logic
   */
  onInit?: () => Promise<void>;
  /**
   * Region for the library instance
   * @default 'us-east-1'
   */
  region?: string;
}

/**
 * Interface defining the state of the CoreLibrary
 */
interface CoreLibraryState {
  initialized: boolean;
  options: CoreLibraryOptions;
  region: string;
}

/**
 * Interface defining the public API of the CoreLibrary
 */
export interface CoreLibrary {
  /**
   * Initializes the CoreLibrary with any necessary setup.
   * @returns {Promise<void>}
   */
  initialize: () => Promise<void>;
  
  /**
   * Checks if the library is initialized.
   * @returns {boolean}
   */
  isInitialized: () => boolean;
  
  /**
   * Gets the current options.
   * @returns {CoreLibraryOptions}
   */
  getOptions: () => CoreLibraryOptions;
  
  /**
   * Gets the current region.
   * @returns {string}
   */
  getRegion: () => string;
}

/**
 * Creates a new instance of the CoreLibrary state
 * @param options - Configuration options for the library
 * @returns {CoreLibraryState} The new instance
 */
const createInstance = (options: CoreLibraryOptions): CoreLibraryState => ({
  initialized: false,
  options,
  region: options.region || 'us-east-1',
});

/**
 * CoreLibrary factory function that returns a singleton instance
 * @param options - Configuration options for the library
 * @returns {CoreLibrary} The singleton instance
 */
export const coreLibrary = (options: CoreLibraryOptions = {}): CoreLibrary => {
  if (!instance) {
    instance = createInstance(options);
  } else {
    // Update options if instance already exists
    instance.options = { ...instance.options, ...options };
    // Update region if provided
    if (options.region) {
      instance.region = options.region;
    }
  }
  
  return {
    /**
     * Initializes the CoreLibrary with any necessary setup.
     * @returns {Promise<void>}
     */
    initialize: async (): Promise<void> => {
      if (instance?.initialized) {
        return;
      }
      
      // Run custom initialization if provided
      if (instance?.options.onInit) {
        await instance.options.onInit();
      }
      
      // Add your initialization logic here
      if (instance) {
        instance.initialized = true;
        
        if (instance.options.debug) {
          console.log('CoreLibrary initialized');
        }
      }
    },
    
    /**
     * Checks if the library is initialized.
     * @returns {boolean}
     */
    isInitialized: (): boolean => {
      return instance?.initialized ?? false;
    },
    
    /**
     * Gets the current options.
     * @returns {CoreLibraryOptions}
     */
    getOptions: (): CoreLibraryOptions => {
      return instance?.options ?? {};
    },
    
    /**
     * Gets the current region.
     * @returns {string}
     */
    getRegion: (): string => {
      return instance?.region ?? 'us-east-1';
    }
  };
}; 