package com.sunbeam.Job_portal.Adapters;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.sunbeam.Job_portal.Activities.AppliedJobDetailsActivity;
import com.sunbeam.Job_portal.Activities.JobDetailsActivity;
import com.sunbeam.Job_portal.Entity.Apply;
import com.sunbeam.Job_portal.Entity.Job;
import com.sunbeam.Job_portal.R;
import com.sunbeam.Job_portal.utils.RetroClient;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class JobListRecyclerViewAdapter extends RecyclerView.Adapter<JobListRecyclerViewAdapter.MyViewHolder> {


    Context context;
    List<Job> jobList;



    public JobListRecyclerViewAdapter(Context context, List<Job> jobList) {
        this.context = context;
        this.jobList = jobList;


    }

    @NonNull
    @Override
    public JobListRecyclerViewAdapter.MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.joblist_layout,null);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull JobListRecyclerViewAdapter.MyViewHolder holder, int position) {
        holder.textJobType.setText(jobList.get(position).getJob_type());
        holder.textLocation.setText(jobList.get(position).getJob_location());
        holder.textCompanyName.setText(jobList.get(position).getCompany_name());
        holder.textPostedOn.setText(jobList.get(position).getCreated_date().substring(0,10));

    }

    @Override
    public int getItemCount() {
        return jobList.size();
    }

    public void setFilteredList(List<Job> filterJobList)
    {
        this.jobList = filterJobList;
        notifyDataSetChanged();
    }

    class MyViewHolder extends RecyclerView.ViewHolder{

        TextView textJobType,textLocation,textCompanyName,textPostedOn;
        List<Apply> applyList;
        Apply apply;
        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            textCompanyName = itemView.findViewById(R.id.textCompanyName);
            textJobType = itemView.findViewById(R.id.textJobType);
            textLocation = itemView.findViewById(R.id.textLocation);
            textPostedOn = itemView.findViewById(R.id.textPostedDt);
            int applicantId = context.getSharedPreferences("jobportal",Context.MODE_PRIVATE).getInt("applicantId",0);


            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Job job = jobList.get(getAdapterPosition());
                    Intent intent = new Intent(context,JobDetailsActivity.class);
                    intent.putExtra("job",job);
                    context.startActivity(intent);
                }
            });



                


        }
    }
}
