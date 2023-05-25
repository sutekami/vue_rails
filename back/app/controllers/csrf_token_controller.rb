class CsrfTokenController < ApplicationController
    def show
        response.set_header('X-CSRF-Token', form_authenticity_token)
        render json: {}
    end
end
