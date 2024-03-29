import Page from '../components/Page';
import Context from '../context/App';
import { classNames } from '../utils/Utils';

class Credentials extends Page {

    constructor(props) {
        super(props)

        this.state = {
            ...this.state,
            heading: 'Credentials',

            provider: null,
            data: null,
            hasChanged: false,

            saveLoading: false,
            saveCompleted: false,
            saveSuccess: false,
            saveError: null,

            testLoading: false,
            testCompleted: false,
            testSuccess: false,
            testError: null,

        }

    }

    componentDidMount() {
        this.context.getCredentials();
    }

    async saveCredentials() {

        if (this.state.saveLoading) return;

        this.setState({
            saveLoading: true,
            saveCompleted: false,
            saveSuccess: false,
            saveError: null,
        });

        this.context.updateProgressBar(10);

        let inter = setInterval(() => {
            this.context.updateProgressBar(this.context.updateProgressBarWidth + 1);
        }, 500)

        let requestSuccess = false;
        this.context.setCredentials(
            this.state.provider,
            this.state.data
        ).then(r => {
            requestSuccess = true;
        }).catch(e => {
            requestSuccess = false;
            this.context.sendError(e.message)
        })

        clearInterval(inter);

        setTimeout(() => {

            this.setState({
                saveLoading: false,
                saveCompleted: true,
                saveSuccess: requestSuccess,
            });

            this.context.updateProgressBar(100);

            setTimeout(() => {
                this.setState({
                    saveLoading: false,
                    saveCompleted: false,
                    saveSuccess: false,
                });
                this.context.updateProgressBar(0);
            }, 2000);

        }, 1500);

    }

    async testCredentials() {

        if (this.state.testLoading) return;

        this.setState({
            testLoading: true,
            testCompleted: false,
            testSuccess: false,
            testError: null,
        });

        this.context.updateProgressBar(10);

        let inter = setInterval(() => {
            this.context.updateProgressBar(this.context.updateProgressBarWidth + 1);
        }, 500)

        let requestSuccess = false;
        this.context.testCredentials(
            this.state.provider,
            this.state.data
        ).then(r => {
            requestSuccess = true;
        }).catch(e => {
            requestSuccess = false;
            this.context.sendError(e.message)
        })

        clearInterval(inter);
        
        setTimeout(() => {

            this.setState({
                testLoading: false,
                testCompleted: true,
                testSuccess: requestSuccess,
            });

            this.context.updateProgressBar(100);

            setTimeout(() => {
                this.context.updateProgressBar(0);
            }, 2000);

        }, 1500);

    }

    awsProvider() {
        return (
            <div className={classNames(
                'w-full h-full | bg-gray-100 dark:bg-gray-700 | rounded-lg shadow-md',
                'flex flex-col items-center justify-between | space-y-4'
            )}>
                <div className='w-full h-20 | flex items-center justify-center | p-4 | space-x-6'>
                    <img className='w-12 h-12 | rounded-lg' src='/images/aws.jpeg' />
                    <h3 className='text-2xl font-bold | text-gray-800 dark:text-white'>
                        AWS Credentials
                    </h3>
                </div>
                <div className='w-full h-full | flex flex-col items-center justify-between | text-gray-700 dark:text-white'>
                    <div className='w-full h-full | p-4 | flex flex-wrap items-start justify-start'>
                        <div className="form-control w-1/2 h-20 flex items-center justify-center | m-0">
                            <label class="label flex items-center justify-start">
                                <span class="label-text text-xl | text-gray-700 dark:text-white">Access Key ID</span>
                                <span className='text-red-500 ml-2 text-xl'>*</span>
                            </label>
                            <input
                                name='accessKeyId'
                                id='accessKeyId'
                                type="text"
                                placeholder="Type here"
                                class="input input-bordered w-full max-w-xs dark:bg-gray-800"
                                value={this.state.data ? this.state.data['aws_access_key_id'] : ""}
                                onChange={(e) => {
                                    this.setState({
                                        hasChanged: true,
                                        data: {
                                            ...this.state.data,
                                            'aws_access_key_id': e.target.value
                                        }
                                    })
                                }}
                            />
                        </div>
                        <div className="form-control w-1/2 h-20 flex items-center justify-center | m-0">
                            <label class="label flex items-center justify-start">
                                <span class="label-text text-xl | text-gray-700 dark:text-white">Secret Access Key</span>
                                <span className='text-red-500 ml-2 text-xl'>*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                class="input input-bordered w-full max-w-xs dark:bg-gray-800"
                                value={this.state.data ? this.state.data['aws_secret_access_key'] : ""}
                                onChange={(e) => {
                                    this.setState({
                                        hasChanged: true,
                                        data: {
                                            ...this.state.data,
                                            'aws_secret_access_key': e.target.value
                                        }
                                    })
                                }}
                            />
                        </div>
                        <div className="form-control w-1/2 h-20 flex items-center justify-center | m-0">
                            <label class="label flex items-center justify-start">
                                <span class="label-text text-xl | text-gray-700 dark:text-white">Bucket</span>
                                <span className='text-red-500 ml-2 text-xl'>*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                class="input input-bordered w-full max-w-xs dark:bg-gray-800"
                                value={this.state.data ? this.state.data['aws_bucket'] : ""}
                                onChange={(e) => {
                                    this.setState({
                                        hasChanged: true,
                                        data: {
                                            ...this.state.data,
                                            'aws_bucket': e.target.value
                                        }
                                    })
                                }}
                            />
                        </div>
                        <div className="form-control w-1/2 h-20 flex items-center justify-center | m-0">
                            <label class="label">
                                <span class="label-text text-xl | text-gray-700 dark:text-white">Prefix</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                class="input input-bordered w-full max-w-xs dark:bg-gray-800"
                                value={this.state.data ? this.state.data['aws_prefix'] : ""}
                                onChange={(e) => {
                                    this.setState({
                                        hasChanged: true,
                                        data: {
                                            ...this.state.data,
                                            'aws_prefix': e.target.value
                                        }
                                    })
                                }}
                            />
                        </div>
                        <div className="form-control w-1/2 h-20 flex items-center justify-center | m-0">
                            <label class="label flex items-center justify-start">
                                <span class="label-text text-xl | text-gray-700 dark:text-white">Region</span>
                                <span className='text-red-500 ml-2 text-xl'>*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                class="input input-bordered w-full max-w-xs dark:bg-gray-800"
                                value={this.state.data ? this.state.data['aws_region'] : ""}
                                onChange={(e) => {
                                    this.setState({
                                        hasChanged: true,
                                        data: {
                                            ...this.state.data,
                                            'aws_region': e.target.value
                                        }
                                    })
                                }}
                            />
                        </div>
                    </div>
                    <div className='w-full h-20 | flex items-center justify-between'>
                        <div className='w-full h-full'>
                        </div>
                        <div className='w-full h-full | flex items-center justify-end | p-4'>
                            <button
                                className={classNames(
                                    'px-4 py-2 | rounded-lg',
                                    'border-2 border-blue-500 text-blue-500 | font-bold',
                                    'hover:bg-blue-500 hover:text-white',
                                    'hover:shadow-md'
                                )}
                                onClick={() => this.saveCredentials()}
                            >
                                Save changes
                                {
                                    this.state.saveLoading ?
                                        (
                                            <svg role="status" className="inline ml-3 w-4 h-4 text-brand-blue dark:text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                            </svg>
                                        )
                                        :
                                        this.state.saveCompleted ?
                                            (
                                                this.state.saveSuccess ?
                                                    (
                                                        // Success Check SVG
                                                        <svg className="inline ml-3 w-4 h-4 text-green-500" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
                                                        </svg>
                                                    ) :
                                                    (
                                                        <svg className="inline ml-3 w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
                                                        </svg>
                                                    )
                                            ) : null
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    ftpProvider() {
        return (
            <div className={classNames(
                'w-full h-full | bg-gray-100 dark:bg-gray-700 | rounded-lg shadow-md',
                'flex flex-col items-center justify-between | space-y-4'
            )}>
                <div className='w-full h-20 | flex items-center justify-center | p-4 | space-x-6'>
                    <h3 className='text-2xl font-bold | text-gray-800 dark:text-white'>
                        FTP Credentials
                    </h3>
                </div>
                <div className='w-full h-full | flex flex-col items-center justify-between | text-gray-700 dark:text-white'>
                    <div className='w-full h-full | p-4 | flex flex-wrap items-start justify-start'>
                        <div className="form-control w-1/2 h-20 flex items-center justify-center | m-0">
                            <label class="label flex items-center justify-start">
                                <span class="label-text text-xl | text-gray-700 dark:text-white">Hostname</span>
                                <span className='text-red-500 ml-2 text-xl'>*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                class="input input-bordered w-full max-w-xs dark:bg-gray-800"
                                value={this.state.data ? this.state.data['hostname'] : ""}
                                onChange={(e) => {
                                    this.setState({
                                        hasChanged: true,
                                        data: {
                                            ...this.state.data,
                                            hostname: e.target.value
                                        }
                                    })
                                }}
                            />
                        </div>
                        <div className="form-control w-1/2 h-20 flex items-center justify-center | m-0">
                            <label class="label flex items-center justify-start">
                                <span class="label-text text-xl | text-gray-700 dark:text-white">Port</span>
                                <span className='text-red-500 ml-2 text-xl'>*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                class="input input-bordered w-full max-w-xs dark:bg-gray-800"
                                value={this.state.data ? this.state.data['port'] : ""}
                                onChange={(e) => {
                                    this.setState({
                                        hasChanged: true,
                                        data: {
                                            ...this.state.data,
                                            port: e.target.value
                                        }
                                    })
                                }}
                            />
                        </div>
                        <div className="form-control w-1/2 h-20 flex items-center justify-center | m-0">
                            <label class="label flex items-center justify-start">
                                <span class="label-text text-xl | text-gray-700 dark:text-white">Username</span>
                                <span className='text-red-500 ml-2 text-xl'>*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                class="input input-bordered w-full max-w-xs dark:bg-gray-800"
                                value={this.state.data ? this.state.data['username'] : ""}
                                onChange={(e) => {
                                    this.setState({
                                        hasChanged: true,
                                        data: {
                                            ...this.state.data,
                                            username: e.target.value
                                        }
                                    })
                                }}
                            />
                        </div>
                        <div className="form-control w-1/2 h-20 flex items-center justify-center | m-0">
                            <label class="label flex items-center justify-start">
                                <span class="label-text text-xl | text-gray-700 dark:text-white">Password</span>
                                <span className='text-red-500 ml-2 text-xl'>*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                class="input input-bordered w-full max-w-xs dark:bg-gray-800"
                                value={this.state.data ? this.state.data['password'] : ""}
                                onChange={(e) => {
                                    this.setState({
                                        hasChanged: true,
                                        data: {
                                            ...this.state.data,
                                            password: e.target.value
                                        }
                                    })
                                }}
                            />
                        </div>
                    </div>
                    <div className='w-full h-20 | flex items-center justify-between'>
                    <div className='w-full h-full | flex items-center justify-start | p-4'>
                            <button
                                className={classNames(
                                    'px-4 py-2 | rounded-lg',
                                    'border-2 border-blue-500 text-blue-500 | font-bold',
                                    'hover:bg-blue-500 hover:text-white',
                                    'hover:shadow-md'
                                )}
                                onClick={() => this.testCredentials()}
                            >
                                Test Connection
                                {
                                    this.state.testLoading ?
                                        (
                                            <svg role="status" className="inline ml-3 w-4 h-4 text-brand-blue dark:text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                            </svg>
                                        )
                                        :
                                        this.state.testCompleted ?
                                            (
                                                this.state.testSuccess ?
                                                    (
                                                        // Success Check SVG
                                                        <svg className="inline ml-3 w-4 h-4 text-green-500" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
                                                        </svg>
                                                    ) :
                                                    (
                                                        <svg className="inline ml-3 w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
                                                        </svg>
                                                    )
                                            ) : null
                                }
                            </button>
                        </div>
                        <div className='w-full h-full | flex items-center justify-end | p-4'>
                            <button
                                className={classNames(
                                    'px-4 py-2 | rounded-lg',
                                    'border-2 border-blue-500 text-blue-500 | font-bold',
                                    'hover:bg-blue-500 hover:text-white',
                                    'hover:shadow-md',
                                    this.state.testSuccess ? "" : "invisible"
                                )}
                                onClick={() => this.saveCredentials()}
                            >
                                Save changes
                                {
                                    this.state.saveLoading ?
                                        (
                                            <svg role="status" className="inline ml-3 w-4 h-4 text-brand-blue dark:text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                            </svg>
                                        )
                                        :
                                        this.state.saveCompleted ?
                                            (
                                                this.state.saveSuccess ?
                                                    (
                                                        // Success Check SVG
                                                        <svg className="inline ml-3 w-4 h-4 text-green-500" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
                                                        </svg>
                                                    ) :
                                                    (
                                                        <svg className="inline ml-3 w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
                                                        </svg>
                                                    )
                                            ) : null
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    sftpProvider() {
        return (
            <div className={classNames(
                'w-full h-full | bg-gray-100 dark:bg-gray-700 | rounded-lg shadow-md',
                'flex flex-col items-center justify-between | space-y-4'
            )}>
                <div className='w-full h-20 | flex items-center justify-center | p-4 | space-x-6'>
                    <h3 className='text-2xl font-bold | text-gray-800 dark:text-white'>
                        SFTP Credentials
                    </h3>
                </div>
                <div className='w-full h-full | flex flex-col items-center justify-between | text-gray-700 dark:text-white'>
                    <div className='w-full h-full | p-4 | flex flex-wrap items-start justify-start'>
                        <div className="form-control w-1/2 h-20 flex items-center justify-center | m-0">
                            <label class="label flex items-center justify-start">
                                <span class="label-text text-xl | text-gray-700 dark:text-white">Hostname</span>
                                <span className='text-red-500 ml-2 text-xl'>*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                class="input input-bordered w-full max-w-xs dark:bg-gray-800"
                                value={this.state.data ? this.state.data['hostname'] : ""}
                                onChange={(e) => {
                                    this.setState({
                                        hasChanged: true,
                                        data: {
                                            ...this.state.data,
                                            hostname: e.target.value
                                        }
                                    })
                                }}
                            />
                        </div>
                        <div className="form-control w-1/2 h-20 flex items-center justify-center | m-0">
                            <label class="label flex items-center justify-start">
                                <span class="label-text text-xl | text-gray-700 dark:text-white">Port</span>
                                <span className='text-red-500 ml-2 text-xl'>*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                class="input input-bordered w-full max-w-xs dark:bg-gray-800"
                                value={this.state.data ? this.state.data['port'] : ""}
                                onChange={(e) => {
                                    this.setState({
                                        hasChanged: true,
                                        data: {
                                            ...this.state.data,
                                            port: e.target.value
                                        }
                                    })
                                }}
                            />
                        </div>
                        <div className="form-control w-1/2 h-20 flex items-center justify-center | m-0">
                            <label class="label flex items-center justify-start">
                                <span class="label-text text-xl | text-gray-700 dark:text-white">Username</span>
                                <span className='text-red-500 ml-2 text-xl'>*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                class="input input-bordered w-full max-w-xs dark:bg-gray-800"
                                value={this.state.data ? this.state.data['username'] : ""}
                                onChange={(e) => {
                                    this.setState({
                                        hasChanged: true,
                                        data: {
                                            ...this.state.data,
                                            username: e.target.value
                                        }
                                    })
                                }}
                            />
                        </div>
                        <div className="form-control w-1/2 h-20 flex items-center justify-center | m-0">
                            <label class="label">
                                <span class="label-text text-xl | text-gray-700 dark:text-white">Password</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                class="input input-bordered w-full max-w-xs dark:bg-gray-800"
                                value={this.state.data ? this.state.data['password'] : ""}
                                onChange={(e) => {
                                    this.setState({
                                        hasChanged: true,
                                        data: {
                                            ...this.state.data,
                                            password: e.target.value
                                        }
                                    })
                                }}
                            />
                        </div>
                        <div className="form-control w-1/2 h-20 flex items-center justify-center | m-0">
                            <label class="label">
                                <span class="label-text text-xl | text-gray-700 dark:text-white">Private Key</span>
                            </label>
                            {
                                this.state.data ?
                                    (
                                        <span className='my-2'>
                                            {
                                                this.state.data['private_key']
                                            }
                                        </span>
                                    ) : null
                            }
                            <button
                                className={classNames(
                                    'px-4 py-2 | rounded-lg',
                                    'bg-white',
                                    'text-gray-700',
                                    'w-2/3',
                                    'text-md',
                                    'btn btn-sm',
                                    'capitalize',
                                )}
                                onClick={() => {
                                    this.context.getLocalPath({
                                        directory: false
                                    }).then(r => {
                                        this.setState({
                                            hasChanged: true,
                                            data: {
                                                ...this.state.data,
                                                "private_key": r
                                            }
                                        });
                                    });
                                }}
                            >
                                Select file
                            </button>
                        </div>
                        <div className="form-control w-1/2 h-20 flex items-center justify-center | m-0">
                            <label class="label">
                                <span class="label-text text-xl | text-gray-700 dark:text-white">Private Key Pass</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                class="input input-bordered w-full max-w-xs dark:bg-gray-800"
                                value={this.state.data ? this.state.data['private_key_pass'] : ""}
                                onChange={(e) => {
                                    this.setState({
                                        hasChanged: true,
                                        data: {
                                            ...this.state.data,
                                            "private_key_pass": e.target.value
                                        }
                                    })
                                }}
                            />
                        </div>
                    </div>
                    <div className='w-full h-20 | flex items-center justify-between'>
                        <div className='w-full h-full | flex items-center justify-start | p-4'>
                            <button
                                className={classNames(
                                    'px-4 py-2 | rounded-lg',
                                    'border-2 border-blue-500 text-blue-500 | font-bold',
                                    'hover:bg-blue-500 hover:text-white',
                                    'hover:shadow-md'
                                )}
                                onClick={() => this.testCredentials()}
                            >
                                Test Connection
                                {
                                    this.state.testLoading ?
                                        (
                                            <svg role="status" className="inline ml-3 w-4 h-4 text-brand-blue dark:text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                            </svg>
                                        )
                                        :
                                        this.state.testCompleted ?
                                            (
                                                this.state.testSuccess ?
                                                    (
                                                        // Success Check SVG
                                                        <svg className="inline ml-3 w-4 h-4 text-green-500" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
                                                        </svg>
                                                    ) :
                                                    (
                                                        <svg className="inline ml-3 w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
                                                        </svg>
                                                    )
                                            ) : null
                                }
                            </button>
                        </div>
                        <div className='w-full h-full | flex items-center justify-end | p-4'>
                            <button
                                className={classNames(
                                    'px-4 py-2 | rounded-lg',
                                    'border-2 border-blue-500 text-blue-500 | font-bold',
                                    'hover:bg-blue-500 hover:text-white',
                                    'hover:shadow-md',
                                    this.state.testSuccess ? "" : "invisible"
                                )}
                                onClick={() => this.saveCredentials()}
                            >
                                Save changes
                                {
                                    this.state.saveLoading ?
                                        (
                                            <svg role="status" className="inline ml-3 w-4 h-4 text-brand-blue dark:text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                            </svg>
                                        )
                                        :
                                        this.state.saveCompleted ?
                                            (
                                                this.state.saveSuccess ?
                                                    (
                                                        // Success Check SVG
                                                        <svg className="inline ml-3 w-4 h-4 text-green-500" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
                                                        </svg>
                                                    ) :
                                                    (
                                                        <svg className="inline ml-3 w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
                                                        </svg>
                                                    )
                                            ) : null
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderProvider() {
        switch (this.state.provider) {
            case 'aws':
                return this.awsProvider();
            case 'ftp':
                return this.ftpProvider();
            case 'sftp':
                return this.sftpProvider();
            default:
                return null;
        }
    }

    getContent() {

        // Set credentials
        if (!this.state.provider && this.context.credentials) {
            this.setState({
                provider: this.context.credentials.data["schema"],
                data: this.context.credentials.data,
            })
        }

        return (
            <div className="flex justify-center items-center w-full h-full | space-x-4">
                <div className='w-1/3 h-full | flex flex-col items-center justify-start | space-y-4 | p-4'>
                    <h3 className='text-2xl | font-bold'>
                        Credentials Provider
                    </h3>
                    <div class="input-group | flex items-center justify-center">
                        <select
                            class="select | bg-gray-100 dark:bg-gray-800"
                            onChange={(e) => {
                                this.setState({
                                    hasChanged: false,
                                    testCompleted: false,
                                    testSuccess: false,
                                    provider: String(e.target.value).toLowerCase(),
                                    data: this.context.credentials &&
                                        this.context.credentials.data &&
                                        this.context.credentials.data["schema"] == String(e.target.value).toLowerCase() ?
                                        this.context.credentials.data : null,
                                });
                            }}
                            defaultValue={this.state.provider}
                        >
                            <option disabled
                                selected={this.state.provider === null}
                            >Select provider</option>
                            {
                                ["aws", "ftp", "sftp"].map((provider) => {
                                    return <option
                                        key={provider}
                                        value={provider}
                                        selected={this.state.provider === provider}
                                    >
                                        {
                                            String(provider).toUpperCase()
                                        }
                                    </option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className='w-2/3 h-full | p-4 | flex items-center justify-center'>
                    {
                        this.renderProvider()
                    }
                </div>
            </div>
        )
    }

}
Credentials.contextType = Context;

export default Credentials;