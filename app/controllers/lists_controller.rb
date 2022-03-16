class ListsController < ApplicationController
  before_action :get_table
  before_action :set_list, only: %i[ show edit update destroy ]

  # GET /lists or /lists.json
  def index
    @lists = @table.lists
    render json: @lists
  end

  # GET /lists/1 or /lists/1.json
  def show
    render json: @list
  end

  # GET /lists/new
  def new
    @list = @table.lists.build
  end

  # GET /lists/1/edit
  def edit
  end

  # POST /lists or /lists.json
  def create
    @list = @table.lists.build(list_params)

    respond_to do |format|
      if @list.save
        format.html { redirect_to table_lists_path(@table), notice: "List was successfully created." }
        format.json { render :show, status: :created, location: @list }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @list.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /lists/1 or /lists/1.json
  def update
    respond_to do |format|
      if @list.update(list_params)
        format.html { redirect_to table_list_path(@table), notice: "List was successfully updated." }
        format.json { render :show, status: :ok, location: @list }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @list.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /lists/1 or /lists/1.json
  def destroy
    @list.destroy

  end

  private
    def get_table
      @table = Table.find(params[:table_id])
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_list
      @list = @table.lists.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def list_params
      params.require(:list).permit(:name, :table_id)
    end
end
