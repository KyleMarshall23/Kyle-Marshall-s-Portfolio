from chalice import Blueprint, BadRequestError, Response
from chalicelib.tenders.tenders_controllers import (
    inreview,
    create_tender,
    accept_tender,
    getCompanyTenders,
    getTicketTender,
    getContracts,
    reject_tender,
    getCompanyContracts,
    complete_contract,
    getMunicipalityTenders,
)

from chalicelib.authorisers import cognito_authorizer

tenders_blueprint = Blueprint(__name__)


@tenders_blueprint.route(
    "/create", authorizer=cognito_authorizer, methods=["POST"], cors=True
)
def create_tender_route():
    request = tenders_blueprint.current_request
    sender_data = request.json_body
    response = create_tender(sender_data)
    return response


@tenders_blueprint.route(
    "/in-review", authorizer=cognito_authorizer, methods=["POST"], cors=True
)
def in_review():
    request = tenders_blueprint.current_request
    sender_data = request.json_body
    response = inreview(sender_data)
    return response


@tenders_blueprint.route(
    "/accept", authorizer=cognito_authorizer, methods=["POST"], cors=True
)
def accepting_tenders():
    request = tenders_blueprint.current_request
    sender_data = request.json_body
    response = accept_tender(sender_data)
    return response


@tenders_blueprint.route(
    "/reject", authorizer=cognito_authorizer, methods=["POST"], cors=True
)
def rejecting_tenders():
    request = tenders_blueprint.current_request
    sender_data = request.json_body
    response = reject_tender(sender_data)
    return response


@tenders_blueprint.route(
    "/completed", authorizer=cognito_authorizer, methods=["POST"], cors=True
)
def completed_contract():
    request = tenders_blueprint.current_request
    sender_data = request.json_body
    response = complete_contract(sender_data)
    return response


@tenders_blueprint.route(
    "/getmytenders", authorizer=cognito_authorizer, methods=["GET"], cors=True
)
def getmytenders():
    request = tenders_blueprint.current_request
    company_name = request.query_params.get("name")
    response = getCompanyTenders(company_name)
    return response


@tenders_blueprint.route(
    "/getmunitenders", authorizer=cognito_authorizer, methods=["GET"], cors=True
)
def getmytenders():
    request = tenders_blueprint.current_request
    municipality = request.query_params.get("municipality")
    response = getMunicipalityTenders(municipality)
    return response


@tenders_blueprint.route(
    "/getmunicipalitytenders", authorizer=cognito_authorizer, methods=["GET"], cors=True
)
def getmunitenders():
    request = tenders_blueprint.current_request
    ticket_id = request.query_params.get("ticket")
    response = getTicketTender(ticket_id)
    return response


@tenders_blueprint.route(
    "/getcontracts", authorizer=cognito_authorizer, methods=["GET"], cors=True
)
def getmunitenders():
    request = tenders_blueprint.current_request
    tender_id = request.query_params.get("tender")
    response = getContracts(tender_id)
    return response


@tenders_blueprint.route(
    "/getcompanycontracts", authorizer=cognito_authorizer, methods=["GET"], cors=True
)
def getcompanycontracts():
    request = tenders_blueprint.current_request
    tender_id = request.query_params.get("tender")
    company_name = request.query_params.get("company")
    response = getCompanyContracts(tender_id, company_name)
    return response
